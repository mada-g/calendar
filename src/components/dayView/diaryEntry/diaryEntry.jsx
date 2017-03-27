import React from 'react';

import "./diaryEntry.scss";

export default class DiaryEntry extends React.Component{
  constructor(props){
    super(props);
  }

  formatTime = (time) => {
    let str = "";
    time.forEach((n, i) => {
      if(i!==0) str += ":";
      if(n < 10) str += "0";
      str += n;
    })
    return str;
  }

  render(){
    const {start, end, title, description, tags, people, eId} = this.props.data;

    return <div className="diaryEntry clearfix">
      <EntryTime start={this.formatTime(start)} end={this.formatTime(end)}/>
      <EntryTitle title={title}/>
      <Description description={description}/>
      <EntryTags tags={tags || []}/>
      <EntryPeople people={people || []}/>
  </div>
  }
}


/* ************** **
** SUB COMPONENTS **
** ************** */


function EntryTime(props){
  const {start, end} = props;
  return <div className="diaryEntry_item diaryEntry_time">{`${start} - ${end}`}</div>
}

function EntryTitle(props){
  const {title} = props;
  return <div className="diaryEntry_item diaryEntry_title">{title}</div>
}

function Description(props){
  const {description} = props;
  return <div className="diaryEntry_item diaryEntry_desc">{description}</div>
}

function EntryTags(props){
  const {tags} = props;
  return <div className="diaryEntry_tags">
    {tags.map(t => <div className="tag">{t}</div>)}
  </div>
}

function EntryPeople(props){
  const {people} = props;
  return <div className="diaryEntry_people">
    {people.map(p => <div className="people">{p}</div>)}
  </div>
}
