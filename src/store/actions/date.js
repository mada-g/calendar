import {populateTable} from './month.js';

export function changeMonth(newMonth){
  return (dispatch) => {

    if(newMonth < 0 || newMonth > 11){
      newMonth < 0 ? dispatch({type: "UPDATE_YEAR", val:-1}) : dispatch({type: "UPDATE_YEAR", val:1});
    }

    dispatch({ type: "CHANGE_MONTH", val: (12+newMonth)%12 });
    dispatch(populateTable());
  }
}

export function setCurrentDate(){
  return (dispatch) => {
    let now = new Date();

    dispatch({
      type: "SET_DATE",
      val: { year: now.getFullYear(),
             month: now.getMonth(),
             day: now.getDate(),
             dayOfWeek: now.getDay() }
    });
  }
}
