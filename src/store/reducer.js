import {combineReducers} from 'redux-immutable';
import {Map, List, fromJS, toJS} from 'immutable';

import month from './reducers/month.js';
import day from './reducers/day.js';
import date from './reducers/date.js';
import appData from './reducers/appData.js';

export default combineReducers({
  date: date,
  viewMonth: month,
  viewDay: day,
  appData: appData
});
