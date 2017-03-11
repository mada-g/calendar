import {List, Map, fromJS, toJS} from 'immutable';

export default function(state = Map(), action){
  switch (action.type) {

    case "OPEN_DAY": {
      console.log("OPENING DAY!");
      const {year,month,day,dayOfWeek} = action.val;
      return state.set("year",  year)
                  .set("month", month)
                  .set("day",   day)
                  .set("dayOfWeek", dayOfWeek)
    }
    
    case "CHANGE_MONTH": {
      return state.set("month", action.val);
    }

    case "UPDATE_YEAR": {
      return (action.val < 0) ? state.update("year", y => y-1) : state.update("year", y => y+1);
    }

    default: {
      return state;
    }

  }
}
