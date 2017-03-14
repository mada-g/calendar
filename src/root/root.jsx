import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import MonthView from '../components/monthView/monthView.jsx';
import DayView from '../components/dayView/dayView.jsx';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {children} = this.props;

    return <BrowserRouter>
      <div className="app">
        <Route exact path="/calendar" component={MonthView}/>
        <Route exact path="/date/:year/:month/:day"
               render={ ({match}) => <DayView routeParams={match.params}/> }
               />
      </div>
    </BrowserRouter>
  }

}
