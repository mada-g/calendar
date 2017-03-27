import {List, Map, fromJS, toJS} from 'immutable';

export default function(state = Map(), action){
  switch (action.type) {

    case "ADD_DAY_FILTER": {
      return state.setIn(["dayFilter", action.filterType, action.val], true);
    }

    case "REMOVE_DAY_FILTER": {
      return state.deleteIn(["dayFilter", action.filterType, action.val]);
    }

    default: {
      return state;
    }

  }
}
