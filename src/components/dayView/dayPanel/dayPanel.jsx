import React from 'react';
import {Link} from 'react-router-dom';

import "./dayPanel.scss";

export default class DayPanel extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {toggleEventDialogue} = this.props;
    return <div className="dayPanel">
      <Link to="/newevent"><AddEventButton handleClick={toggleEventDialogue}/></Link>
    </div>
  }
}


function AddEventButton(props){
  const {handleClick} = props;
  return <div className="dayPanel_AddEvent" onClick={handleClick}>
    add an event
  </div>
}
