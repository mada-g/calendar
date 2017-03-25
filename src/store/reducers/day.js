import {List, Map, fromJS} from 'immutable';

const clearedDayEvents = fromJS({day: [], reg: []});

export default function(state = Map(), action){
  switch (action.type) {

    case "CREATE_REG_EVENT": {
      const {eId, title, start, end, description, isAllDay, tags} = action.val;
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

      let _state = insertTags(state, tags, eId);
      return _state.updateIn(["eids","reg"], e => e.insert(index, eId))
                  .setIn(["events", eId], fromJS(action.val))
    }

    case "CREATE_DAY_EVENT": {
      const {eId, title, start, end, description, isAllDay} = action.val;
      return state.updateIn(["eids","day"], e => e.insert(index, eId))
                  .setIn(["events", eId], fromJS(action.val));
    }

    case "SET_DAY_IN_FOCUS": {
      const {year, month, day, dayOfWeek} = action.val;
      return state.set("date", Map({year, month, dayNum:day, dayOfWeek}));
    }

    case "CLEAR_DAY_DATA": {
      return state.set("metaD", Map())
                  .set("eids", clearedDayEvents)
                  .set("filtered", clearedDayEvents)
                  .set("events", Map());
    }

    case "SET_DAY_DATA": {
      const data = fromJS(action.val);
      return state.set("metaD", data.get("metaD"))
                  .set("eids", data.get("eids"))
                  .set("filtered", data.get("filtered"))
                  .set("events", data.get("events"))
    }

    case "SET_ALL_TAGS": {
      return state.set("allTags", fromJS(action.val));
    }

    default: {
      return state;
    }

  }
}


function insertTags(state, tags, eId){
  let _state = state;
  tags.forEach(t => {
    _state = _state.updateIn(["metaD", "tags", t], List(), eIds => eIds.push(eId))
  })
  return _state;
}

function insertInMeta(state, type, vals, eid){
  let _state = state;
  vals.forEach(v => {
    _state =  _state.updateIn(["metaD", type, v], List(), eids => eids.push(eid));
  })

  return _state;
}
