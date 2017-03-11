import React from 'react';

import "./diary.scss";
import DiaryEntry from '../diaryEntry/diaryEntry.jsx';

export default class Diary extends React.Component{
  constructor(props){
    super(props);
  }

  renderEntries = (eids, events) => {
    return eids.map((eid) => {
      return <DiaryEntry data={events[eid]}/>
    })
  }

  render(){
    const {eids: {reg}, events} = this.props.daydata;
    return <div className="diary">
      {this.renderEntries(reg, events)}
    </div>
  }
}
