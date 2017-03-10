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
    const {year, month, day, dayOfWeek, entries} = this.props.state;
    const callbacks = { toggleEventDialogue : this.toggleEventDialogue,
                        createEvent : this.props.createEvent };

    console.log("----------");
    entries.forEach( ({start}) => console.log(start[0] + " - " + start[1]) );
    console.log("----------");

    return <HashRouter hashType="noslash">
      <div className="dayView">
        <div className="dayView_main clearfix">
          <DayTitle title={this.props.state}/>
          <DayRouting state={this.props.state} callbacks={callbacks}/>
        </div>
      </div>
    </HashRouter>
  }
}



  /*******************
  ** SUB COMPONENTS **
  *******************/


function DayRouting(props){
  const {year, month, day, dayOfWeek, entries} = props.state;
  const {toggleEventDialogue, createEvent} = props.callbacks;

  return <Switch>
    <Route path="/newevent" render={p => <AddEventDialogue day={year} createEvent={createEvent}/>} />
    <Route render={p => <DayContent data={props.state} toggleEventDialogue={toggleEventDialogue}/>}/>
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


function DayContent({data:{year, month, day, dayOfWeek, entries}, toggleEventDialogue}){
  return <div className="dayView_container clearfix">
      <div className="dayView_container_section left"><Diary entries={entries}/></div>
      <div className="dayView_container_section right"><DayPanel toggleEventDialogue={toggleEventDialogue} /></div>
    </div>
}


function mapState(state){
  return {
    state: state.get("viewDay").toJS()
  }
}


export default connect(mapState, actions)(DayView);
