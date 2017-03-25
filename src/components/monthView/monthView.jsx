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
    props.populateTable();
    props.syncMonthData();
  }

  getDayMetaD = (dayNum) => {
    const {daysMetaD} = this.props.monthdata;
    return daysMetaD.hasOwnProperty(`d${dayNum}`) ? daysMetaD[`d${dayNum}`] : null;
  }

  render(){
    const {table, daysMetaD, dayNames, tags} = this.props.monthdata;
    const {month} = this.props.date;
    //const {viewMonth: {table, daysMetaD, dayNames}, date: {month}} = this.props.state;

    const {openDay, changeMonth} = this.props;

    console.log("$$$$$$$$$$$$$$$$$$");
    console.log(tags);
    console.log("$$$$$$$$$$$$$$$$$$");

    return <div className="monthView">
      <MonthTitle month={month} changeMonth={changeMonth}/>
      <div className="monthView_table">
        <WeekHeader labels={dayNames}/>
        <Table data={table} cell={<DayWidget currentMonth={month} openDay={openDay} getMetaD={this.getDayMetaD}/>} />
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
    monthdata: state.get("viewMonth").toJS(),
    date: state.get("date").toJS()
  }
}

export default connect(mapState, actions)(MonthView);
