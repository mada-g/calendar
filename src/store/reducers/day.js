import {List, Map, fromJS} from 'immutable';

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

    case "CREATE_EVENT": {
      const {title, start, end, description, isAllDay} = action.val;
      let index = null;
      state.get("entries").forEach((entry,i,th) => {
        let h = entry.get("start").get(0),
            m = entry.get("start").get(1);

        if(start[0] > h) return true;
        else if(start[0] == h && start[1] > m) return true;
        index = i; return false;
      })

      if(index === null) index = state.get("entries").size;
      return state.update("entries", e => e.insert(index, fromJS(action.val)));
    }

    default: {
      return state;
    }

  }
}
