import React from 'react';

import "./dayWidget.scss";

const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

export default class DayWidget extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {data, rowNum, colNum:dayOfWeek} = this.props;
    const {currentMonth, openDay} = this.props;
    const [day, month, year] = data;

    return <div className={`dayWidget ${month===currentMonth ? "in-month" : "out-month"}`}
                onClick={() => openDay({day, month, year, dayOfWeek})} >

      <div className="dayWidget-content">
        {`${months[month]} ${day} ${year}`}
      </div>

    </div>
  }
}
