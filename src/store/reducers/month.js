import {Map, List, fromJS, toJS} from "immutable";

export default function(state = Map(), action){
  switch (action.type) {
    case "POPULATE_TABLE": {
      return state.set("table", action.val);
    }

    case "SET_MONTH_DATA": {
      return state.set("daysMetaD", action.val);
    }

    case "POPULATE_TAGS": {
      return state.set("tags", fromJS(action.val) || List());
    }

    default: {
      return state;
    }

  }
}
