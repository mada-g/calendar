import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';

import {months, days, resolveSuffix} from '../../utils/utils.js';
import "./dayView.scss";
import actions from '../../store/actions.js';
import Diary from './diary/diary.jsx';
import DayPanel from './dayPanel/dayPanel.jsx';
import AddEventDialogue from './AddEventDialogue/AddEventDialogue.jsx';


class DayView extends React.Component{
  constructor(props){
    super(props);
    this.state = { addEventDialogue : false }
  }

  toggleEventDialogue = () => {
    this.setState({ addEventDialogue : !this.state.addEventDialogue });
  }

  render(){
    const callbacks = { toggleEventDialogue : this.toggleEventDialogue,
                        createEvent : this.props.createEvent };

    return <HashRouter hashType="noslash">
      <div className="dayView">
        <div className="dayView_main clearfix">
          <DayTitle title={this.props.date}/>
          <DayRouting date={this.props.date} daydata={this.props.daydata} callbacks={callbacks}/>
        </div>
      </div>
    </HashRouter>
  }
}


  /*******************
  ** SUB COMPONENTS **
  *******************/


function DayRouting(props){
  const {toggleEventDialogue, createEvent} = props.callbacks;

  return <Switch>
    <Route path="/newevent" render={p => <AddEventDialogue createEvent={createEvent}/>} />
    <Route render={p => <DayContent daydata={props.daydata} date={props.date} toggleEventDialogue={toggleEventDialogue}/>}/>
  </Switch>
}


function DayTitle(props){
  const {year, month, day, dayOfWeek} = props.title;
  return <div className="dayView_dayTitle">
    <div className="dayView_dayTitle_content">
      {`${days[dayOfWeek]}, ${months[month]} ${day}${resolveSuffix(day)} ${year}.`}
    </div>
  </div>
}


function DayContent({daydata, toggleEventDialogue}){
  return <div className="dayView_container clearfix">
      <div className="dayView_container_section left"><Diary daydata={daydata}/></div>
      <div className="dayView_container_section right"><DayPanel toggleEventDialogue={toggleEventDialogue} /></div>
    </div>
}


function mapState(state){
  return {
    daydata: state.get("viewDay").toJS(),
    date: state.get("date").toJS()
  }
}


export default connect(mapState, actions)(DayView);
