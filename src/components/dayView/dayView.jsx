import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import "./dayView.scss";
import actions from '../../store/actions.js';
import Diary from './diary/diary.jsx';

const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function resolveSuffix(num){
  if(num > 3 && num < 21) return "th";
  let c = (""+num).slice(-1);
  return c==="1" ? "st" : (c==="2" ? "nd" : (c==="3" ? "rd" : "th"));
}

class DayView extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
//    const {year, month, day} = this.props.params;
      const {year, month, day, dayOfWeek} = this.props.state;
      console.log(this.props.state);
    return <div className="dayView">
      <div className="dayView_main">
        <DayTitle title={this.props.state}/>
        <div className="dayView_container clearfix">
          <div className="dayView_container_section"><Diary/></div>
          <div className="dayView_container_section"></div>
        </div>
      </div>
    </div>
  }
}



  /*******************
  ** SUB COMPONENTS **
  *******************/



function DayTitle(props){
  const {year, month, day, dayOfWeek} = props.title;
  return <div className="dayView_dayTitle">
    <div className="dayView_dayTitle_content">
      {`${days[dayOfWeek]}, ${months[month]} ${day}${resolveSuffix(day)} ${year}.`}
    </div>
  </div>
}


function mapState(state){
  return {
    state: state.get("viewDay").toJS()
  }
}



export default connect(mapState, actions)(DayView);
