import React from 'react';
import {Router, Route, IndexRedirect} from 'react-router';

import App from '../components/App/app.jsx';
import MonthView from '../components/monthView/monthView.jsx';
import DayView from '../components/dayView/dayView.jsx';

export function main(){
  return <Route path="/" component={App}>
    <IndexRedirect to="/calendar"/>
    <Route path="calendar" component={MonthView}/>
    <Route path="date/:year/:month/:day" component={DayView}/>
  </Route>
}

export const day = (
  <Route path="/" component={App}>
    <IndexRedirect to="/date"/>
    <Route path="date" component={DayView}/>
  </Route>
)
