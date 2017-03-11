import {Map, List, fromJS, toJS} from 'immutable';
import {Calendar} from "calendar";
import {browserHistory} from 'react-router';

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
