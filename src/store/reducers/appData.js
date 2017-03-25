import {List, Map, fromJS, toJS} from 'immutable';

export default function(state = Map(), action){
  switch (action.type) {

    case "SET_APP_TAGS": {
      return state.set("allTags", action.val);
    }

    default: {
      return state;
    }

  }
}
