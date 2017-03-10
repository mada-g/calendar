import React from 'react';

import "./diary.scss";
import DiaryEntry from '../diaryEntry/diaryEntry.jsx';

export default class Diary extends React.Component{
  constructor(props){
    super(props);
  }

  renderEntries = (entries) => {
    return entries.map((e) => {
      return <DiaryEntry data={e}/>
    })
  }

  render(){
    const {entries} = this.props;
    return <div className="diary">
      {this.renderEntries(entries)}
    </div>
  }
}
