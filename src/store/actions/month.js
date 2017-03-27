import {Map, List, fromJS, toJS} from 'immutable';
import {Calendar} from "calendar";
import {browserHistory} from 'react-router';

import {fetchMonthData} from "../../utils/fetch-data.js";
import {listFromKeys} from "../../utils/utils.js";

let calendar = new Calendar(1);

export function populateTable(){
  return (dispatch, getState) => {
    const currentMonth = getState().getIn(["date", "month"]);
    const currentYear = getState().getIn(["date", "year"]);

    let table = calendar.monthDates(currentYear, currentMonth, (d) => {
      return [d.getDate(), d.getMonth(), d.getFullYear()];
    });


    table.forEach( (w) => w.forEach((day,i) => day.push(i)) );

    console.log(table);

    dispatch({
      type: "POPULATE_TABLE",
      val: fromJS(table)
    });
  }
}

export function openDay(day, history){
  return (dispatch) => {
    const {day:d, month:m, year:y, dayOfWeek} = day;

    let str=`${y}/${m+1}/${d}`;

    dispatch({type: "OPEN_DAY", val:day});
    history.push(`/date/${str}`);
  }
}

export function gatherTags(){
  return (dispatch, getState) => {
    let tagsObj = {}, peopleObj = {};

    let days = getState().getIn(["viewMonth", "daysMetaD"], Map()).toJS();

    for(let d in days){
      const metaD = days[d]["metaD"] || {};
      const dayTags = metaD["tags"] || {};
      const dayPeople = metaD["people"] || {};

      for(let t in dayTags)
        if(dayTags.hasOwnProperty(t)) tagsObj[t] = true;

      for(let p in dayPeople)
        if(dayPeople.hasOwnProperty(p)) peopleObj[p] = true;
    }

    dispatch({ type: "SET_MONTH_TAGS", val: listFromKeys(tagsObj) });
    dispatch({ type: "SET_MONTH_PEOPLE", val: listFromKeys(peopleObj)})
  }

}

export function setMonthData(data){
  return (dispatch, getState) => {
    dispatch({ type: "SET_MONTH_DATA", val:data });
    dispatch(gatherTags());
  }
}

export function syncMonthData(){
  return (dispatch) => {
    fetchMonthData(2011, 11).then(res => {
      if(res && res.status && res.hasOwnProperty("data")){
        dispatch(setMonthData(res.data));
      }
    });

  }
}
