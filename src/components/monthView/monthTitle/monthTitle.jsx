import React from 'react';
import debounce from 'lodash.debounce';

import "./monthTitle.scss";

const months = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];


export default class MonthTitle extends React.Component{
  constructor(props){
    super(props);
  }

  syncMonth = debounce((n) => {
    console.log("sync... " + n);
  }, 500)

  navHandler = (newMonth) => () => {
    this.props.changeMonth(newMonth);
    this.syncMonth(months[newMonth]);
  }

  render(){
    const {month} = this.props;
    return <div className="monthTitle clearfix">
      <div className="monthTitle_container clearfix">

        <Navig navHandler={this.navHandler(month-1)} side="left"/>
        <TitleText month={month}/>
        <Navig navHandler={this.navHandler(month+1)} side="right"/>

      </div>
    </div>
  }
}


/*******************
** SUB COMPONENTS **
*******************/

function Navig(props){
  const {side, navHandler} = props;
  return <div className="monthTitle_nav" onClick={navHandler}>
    <div className="centered monthTitle_nav_arrow">
    </div>
  </div>
}

function TitleText(props){
  const {month} = props;
  return <div className="monthTitle_txt">
    <div className="centered monthTitle_txt_content">{months[month]}</div>
  </div>
}
