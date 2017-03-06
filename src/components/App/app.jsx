import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import MonthView from '../monthView/monthView.jsx';
import DayView from '../dayView/dayView.jsx';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {children} = this.props;
    console.log("this is app")

    return <BrowserRouter>
      <div className="app">
        <Route path="/calendar" component={MonthView}/>
        <Route path=""
      </div>
    </BrowserRouter>
  }

}
