import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import "./monthView.scss";

import actions from '../../store/actions.js';

import Table from './table/table.jsx';
import DayWidget from './dayWidget/dayWidget.jsx';
import MonthTitle from './monthTitle/monthTitle.jsx';


class MonthView extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {viewMonth: {table, days, dayNames}, date: {month}} = this.props.state;
    const {openDay, changeMonth} = this.props;

    return <div className="monthView">
      <MonthTitle month={month} changeMonth={changeMonth}/>
      <div className="monthView_table">
        <WeekHeader labels={dayNames}/>
        <Table data={table} cell={<DayWidget currentMonth={month} openDay={openDay}/>} />
      </div>
    </div>
  }
}


/* SUB COMPONENTS */

function WeekHeader(props){
  return <div className="header">
    { props.labels.map((name) => <div className="table_cell">{name}</div>) }
  </div>
}

function mapState(state){
  return {
    state: state.toJS()
  }
}

export default connect(mapState, actions)(MonthView);
