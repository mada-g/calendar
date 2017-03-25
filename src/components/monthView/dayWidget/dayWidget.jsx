import React from 'react';
import {withRouter} from 'react-router-dom';

import "./dayWidget.scss";

const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

class DayWidget extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    const {data, rowNum, colNum:dayOfWeek} = this.props;
    const {currentMonth, openDay, getMetaD} = this.props;
    const {history} = this.props;
    const [day, month, year] = data;

    //let metaD = getMetaD(day);

    return <div className={`dayWidget ${month===currentMonth ? "in-month" : "out-month"}`}
                onClick={() => openDay({day, month, year, dayOfWeek}, history)} >

        <div className="dayWidget-content">
          {`${months[month]} ${day} ${year}`}
        </div>

      </div>
    }
}

export default withRouter(DayWidget);
