import shortid from 'shortid';
import {Map, List, fromJS, toJS} from 'immutable';

import {isDateValid} from "../../utils/utils.js";
import {fetchDayData} from "../../utils/fetch-data.js";

export function createEvent({duration, title, description, isAllDay}, history){
  return (dispatch) => {
    let eId = shortid.generate();

    if(!isAllDay){
      let [start, end] = duration.map(d => d.map(t => parseInt(t)));
      dispatch({ type : "CREATE_REG_EVENT",
                 val  : {eId, start, end, title, description, isAllDay} });
    }
    else {
      dispatch({ type : "CREATE_DAY_EVENT",
                 val  : {eId, title, description, isAllDay} });
    }

    history.push("/");
  }
}


export function setOpenDay(year, month, day){
  return (dispatch, getState) => {
    if(!isDateValid(year, month, day)) dispatch(invalidDate());

    else{
      dispatch(clearDayData());
      dispatch(setDayinFocus(year, month, day));
      dispatch(syncDayData());
    }

  }
}

export function clearDayData(){
  return { type: "CLEAR_DAY_DATA" };
}

export function setDayinFocus(year, month, day){

  return { type: "SET_DAY_IN_FOCUS",
           val: {year, month, day} }

}

export function invalidDate(){
  return { type: "INVALID_DATE" };
}

export function setDayData(year, month, day, data){
  return (dispatch, getState) => {
    let y = getState().getIn(["dayView", "year"]),
        m = getState().getIn(["dayView", "month"]),
        d = getState().getIn(["dayView", "day"]);

    if(year == y && month == m && day == d){
      if(data === null){
        dispatch({ type: "SET_DAY_DATA", ok: false });
      }
      else {
        dispatch({
          type: "SET_DAY_DATA",
          ok: true,
          metaD : data.metaD,
          eids : data.eids,
          filtered : data.filtered,
          events: data.events
        })
      }
    }
  }
}

export function syncDayData(dateID){
  return (dispatch, getState) => {
    let year   = getState().getIn(["dayView", "year"]);
    let month  = getState().getIn(["dayView", "month"]);
    let day    = getState().getIn(["dayView", "day"]);

    fetchDayData(year, month, day).then(res => {
      if(res.status && res.hasOwnProperty("data"))
        dispatch(setDayData(year, month, day, res.data));
    })
  }
}
