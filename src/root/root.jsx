import React from 'react';
import {Provider} from 'react-redux';
//import {Router} from 'react-router';
import {Router, Route, IndexRedirect} from 'react-router';

import App from '../components/App/app.jsx';
import MonthView from '../components/monthView/monthView.jsx';
import DayView from '../components/dayView/dayView.jsx';
import {main, day} from '../routes/index.jsx';

export default function(props){
  const {store, history} = props;
  return <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={container(App)}>
        <IndexRedirect to="/calendar"/>
        <Route path="calendar" component={container(MonthView)}/>
        <Route path="date/:year/:month/:day" component={container(DayView)}/>
      </Route>
    </Router>
  </Provider>
}


const container = (component) => (props) => <component/>
