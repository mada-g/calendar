import {Map, List} from "immutable";

export default function(state = Map(), action){
  switch (action.type) {
    case "POPULATE_TABLE": {
      return state.set("table", action.val);
    }

    case "CHANGE_MONTH": {
      return state.set("month", action.val);
    }

    case "UPDATE_YEAR": {
      return (action.val < 0) ? state.update("year", y => y-1) : state.update("year", y => y+1);
    }

    case "OPEN_DAY": {
      return state;
    }

    default: {
      return state;
    }

  }
}
