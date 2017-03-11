import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import "./AddEventDialogue.scss";
import Duration from "./duration.jsx";
import Title from "./title.jsx";
import EventType from "./eventType.jsx";
import Description from "./description.jsx";
import AddTags from "./addTags.jsx";

class AddEventDialogue extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      duration    : [["00","00"], ["00","00"]],
      title       : "New Event",
      isAllDay    : false,
      description : "faef efw",
      tags        : []
    }
  }

  handleCreate = () => {
    this.props.createEvent(this.state, this.props.history);
  }

  setVal = key => val => this.setState({[key] : val});

  render(){
    const {duration, title, isAllDay, description, tags} = this.state;
    let tagsList = ["abou", "babos", "bobous", "babousy", "habou", "babous", "bobaus", "babbou", "babouz"];

    return <div className="addEventDialogue">
      <CloseButton />
      <Title val={title} setVal={this.setVal("title")}/>
      <EventType val={isAllDay} setVal={this.setVal("isAllDay")}/>
      {isAllDay ? null : <Duration val={duration} setVal={this.setVal("duration")}/>}
      <Description val={description} setVal={this.setVal("description")}/>
      <AddTags val={tags} tagsList={tagsList} setVal={this.setVal("tags")}/>
      <SubmitButton handleClick = {this.handleCreate}/>
    </div>
  }
}

function SubmitButton(props){
  return <div className="eventDialogue_box">
    <div className="eventDialogue_button" onClick={props.handleClick}>button</div>
  </div>
}

function CloseButton(props){
  return <div className="eventDialogue_box eventDialogue_closeButton">
    <Link to="/">
      <div className="eventDialogue_button"> X </div>
    </Link>
  </div>
}

export default withRouter(AddEventDialogue);