import {Map, List, fromJS, toJS} from 'immutable';
import {Calendar} from "calendar";
import {browserHistory} from 'react-router';

let calendar = new Calendar(1);

export function populateTable(){
  return (dispatch, getState) => {
    const currentMonth = getState().getIn(["viewMonth", "month"]);
    const currentYear = getState().getIn(["viewMonth", "year"]);

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

export function openDay(day){
  return (dispatch) => {
    const {day:d, month:m, year:y, dayOfWeek} = day;
    let str=`${y}/${m+1}/${d}`;
    dispatch({type: "OPEN_DAY", val:day});
    browserHistory.push(`/date/${str}`);
  }
}

export function changeMonth(newMonth){
  return (dispatch) => {

    if(newMonth < 0 || newMonth > 11){
      newMonth < 0 ? dispatch({type: "UPDATE_YEAR", val:-1}) : dispatch({type: "UPDATE_YEAR", val:1});
    }

    dispatch({ type: "CHANGE_MONTH", val: (12+newMonth)%12 });
    dispatch(populateTable());
  }
}
