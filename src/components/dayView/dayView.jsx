import React from 'react';
import {connect} from 'react-redux';
import {Map, List, toJS} from 'immutable';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';

import {months, days, resolveSuffix, listFromKeys} from '../../utils/utils.js';
import "./dayView.scss";
import actions from '../../store/actions.js';
import Diary from './diary/diary.jsx';
import DayPanel from './dayPanel/dayPanel.jsx';
import AddEventDialogue from './AddEventDialogue/AddEventDialogue.jsx';


class DayView extends React.Component{
  constructor(props){
    super(props);
    const {year, month, day} = props.routeParams;
    console.log(props.routeParams);
    props.setOpenDay(parseInt(year), parseInt(month) - 1, parseInt(day));
    this.state = { addEventDialogue : false }
  }

  toggleEventDialogue = () => {
    this.setState({ addEventDialogue : !this.state.addEventDialogue });
  }

  render(){
    const {allTags, allPeople, date, daydata, createEvent, filter} = this.props;

    return <HashRouter hashType="noslash">
      <div className="dayView">
        <div className="dayView_main clearfix">
          <DayTitle title={date}/>

          <Switch>
            <Route path="/newevent" render={p => <AddEventDialogue createEvent={createEvent} allPeople={allPeople} allTags={allTags}/>} />
            <Route render={p => <DayContent filter={filter} daydata={daydata} date={date} toggleEventDialogue={this.toggleEventDialogue}/>}/>
          </Switch>

        </div>
      </div>
    </HashRouter>
  }
}


  /*******************
  ** SUB COMPONENTS **
  *******************/

function DayTitle(props){
  const {year, month, dayNum:day, dayOfWeek} = props.title;

  return <div className="dayView_dayTitle">
    <div className="dayView_dayTitle_content">
      {`${days[dayOfWeek]}, ${months[month]} ${day}${resolveSuffix(day)} ${year}.`}
    </div>
  </div>
}


function DayContent({daydata, filter, toggleEventDialogue}){
  return <div className="dayView_container clearfix">
      <div className="dayView_container_section left"><Diary filter={filter} daydata={daydata}/></div>
      <div className="dayView_container_section right"><DayPanel filter={filter} toggleEventDialogue={toggleEventDialogue} /></div>
    </div>
}


function mapState(state){
  let _filteredTags = state.getIn(["appUI", "dayFilter", "tags"], Map()).toJS();
  let _filteredPeople = state.getIn(["appUI", "dayFilter", "people"], Map()).toJS();


  return {
    daydata: state.get("viewDay").toJS(),
    date: state.getIn(["viewDay", "date"]).toJS(),
    allTags: state.getIn(["viewDay", "allTags"]).toJS(),
    allPeople: state.getIn(["viewDay", "allPeople"]).toJS(),
    filter: {
      tags: listFromKeys(_filteredTags),
      people: listFromKeys(_filteredPeople)
    }

  }
}


export default connect(mapState, actions)(DayView);
