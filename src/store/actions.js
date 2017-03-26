import * as month from './actions/month.js';
import * as day from './actions/day.js';
import * as date from './actions/date.js';
import * as appUI from './actions/appUI.js';

export default Object.assign({},
  date,
  month,
  day,
  appUI
);
