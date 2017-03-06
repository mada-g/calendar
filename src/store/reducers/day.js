import {List, Map} from 'immutable';

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

    default: {
      return state;
    }

  }
}
