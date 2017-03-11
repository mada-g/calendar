import {List, Map, fromJS} from 'immutable';

export default function(state = Map(), action){
  switch (action.type) {

    case "CREATE_REG_EVENT": {
      const {eId, title, start, end, description, isAllDay} = action.val;
      let index = null;
      let events = state.get("events");
      state.getIn(["eids","reg"]).forEach((entry,i,th) => {
        let t = events.getIn([entry, "start"]);
        let h = t.get(0), m = t.get(1);

        if(start[0] > h) return true;
        else if(start[0] == h && start[1] > m) return true;
        index = i; return false;
      })

      if(index === null) index = state.getIn(["eids","reg"]).size;

      let _state = insertInMeta(state, "tags", ["New", "Babou", "Mia"], eId);

      return _state.updateIn(["eids","reg"], e => e.insert(index, eId))
                  .setIn(["events", eId], fromJS(action.val))

    }

    case "CREATE_DAY_EVENT": {
      const {eId, title, start, end, description, isAllDay} = action.val;
      return state.updateIn(["eids","day"], e => e.insert(index, eId))
                  .setIn(["events", eId], fromJS(action.val));
    }

    default: {
      return state;
    }

  }
}

function insertInMeta(state, type, vals, eid){
  let _state = state;
  vals.forEach(v => {
    _state =  _state.updateIn(["metaD", type, v], List(), eids => eids.push(eid));
  })

  return _state;
}
