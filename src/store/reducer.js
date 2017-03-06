import {combineReducers} from 'redux-immutable';
import {Map, List, fromJS, toJS} from 'immutable';

import month from './reducers/month.js';
import day from './reducers/day.js';

export default combineReducers({
  viewMonth: month,
  viewDay: day
});
