import {Map, List} from "immutable";

export default function(state = Map(), action){
  switch (action.type) {
    case "POPULATE_TABLE": {
      return state.set("table", action.val);
    }

    case "OPEN_DAY": {
      return state;
    }

    default: {
      return state;
    }

  }
}
