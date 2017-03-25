import shortid from 'shortid';
import {Map, List, fromJS, toJS} from 'immutable';
import debounce from "lodash.debounce";

import {isDateValid, listFromKeys} from "../../utils/utils.js";
import {fetchDayData} from "../../utils/fetch-data.js";
import {saveDayData} from "../../utils/send-data.js";

export function createEvent({duration, title, description, isAllDay, tags}, history){
  return (dispatch) => {
    let eId = shortid.generate();

    let _tags = listFromKeys(tags);

    if(!isAllDay){
      let [start, end] = duration.map(d => d.map(t => parseInt(t)));
      dispatch({ type : "CREATE_REG_EVENT",
                 val  : {eId, start, end, title, description, isAllDay, tags:_tags} });
    }
    else {
      dispatch({ type : "CREATE_DAY_EVENT",
                 val  : {eId, title, description, isAllDay, tags:_tags} });
    }

    dispatch(saveDay());

    history.push("/");
  }
}

export function saveDay(){
  return (dispatch, getState) => {
    let {year, month, dayNum} = getState().getIn(["viewDay", "date"]).toJS();

    let data = getState().get("viewDay").toJS();
    saveDayData(`y${year}m${month}d${dayNum}`, data).then(console.log);
  }
}

export function setOpenDay(year, month, day){
  return (dispatch, getState) => {
    console.log(year + " - " + month + " - " + day);
    console.log(isDateValid(year,month,day))
    if(!isDateValid(year, month, day)) dispatch(invalidDate());

    else{
      let dayOfWeek = (7 + new Date(year, month, day).getDay() - 1) % 7;
      console.log("day: " + dayOfWeek);
      dispatch(clearDayData());
      dispatch(setDayinFocus(year, month, day, dayOfWeek));
      dispatch(syncDayData());
    }

  }
}

export function clearDayData(){
  return { type: "CLEAR_DAY_DATA" };
}

export function setDayinFocus(year, month, day, dayOfWeek){

  return { type: "SET_DAY_IN_FOCUS",
           val: {year, month, day, dayOfWeek} }

}

export function invalidDate(){
  return { type: "INVALID_DATE" };
}

export function setDayData(year, month, day, data){
  return (dispatch, getState) => {
    let date = getState().getIn(["viewDay", "date"]).toJS();
    let {year : y, month : m, dayNum : d} = date;

    if(year == y && month == m && day == d){
      if(data !== null && "allTags" in data) dispatch({type:"SET_ALL_TAGS", val:data["allTags"]});

      if(data !== null && "metaD" in data && "eids" in data && "filtered" in data && "events" in data){
        dispatch({type: "SET_DAY_DATA", val:data})
      } else {
        dispatch(clearDayData());
      }

    }
  }
}

export function syncDayData(){
  return (dispatch, getState) => {
    let date = getState().getIn(["viewDay", "date"]).toJS();
    let {year, month, dayNum} = date;

    fetchDayData(year, month, dayNum).then(res => {
      console.log(res);
      if(res && res.status && res.hasOwnProperty("data"))
        dispatch(setDayData(year, month, dayNum, res.data));
    }).catch(console.log)
  }
}
