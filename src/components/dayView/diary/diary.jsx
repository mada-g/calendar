import React from 'react';

import "./diary.scss";
import {listFromKeys} from '../../../utils/utils.js';
import DiaryEntry from '../diaryEntry/diaryEntry.jsx';

export default class Diary extends React.Component{
  constructor(props){
    super(props);
    this.state = { filtered: {reg: [], day: []} }
  }

  componentWillReceiveProps = (newProps) => {
    const {reg, day} = this.filterEntries(newProps.filter, newProps.daydata);
    this.setState({ filtered: {reg, day} });
  }

  filterEntries = ({tags, people}, {eids: {reg}, events, metaD}) => {
    let dayTags = metaD["tags"] || {};
    let filtered = {reg: [], day: []};

    filtered.reg = this.filterByTag(reg || [], tags, dayTags);

    console.log("FILTER: ");
    console.log(filtered);
    return filtered;
  }

  filterByTag = (filtered, tags, dayTags) => {
    console.log(tags);
    if(tags.length == 0 || filtered.length == 0) return filtered;
    let t = tags[0];
    let eids = dayTags[t] || {};
    let _filtered = filtered.filter(i => eids.hasOwnProperty(i));

    return this.filterByTag(_filtered, tags.slice(1), dayTags);
  }

  renderEntries = (events) => {
    const {reg, day} = this.state.filtered;

    return reg.map((r) => {
      return <DiaryEntry data={events[r]}/>
    })
  }

  render(){
    const {eids: {reg}, events} = this.props.daydata;
    return <div className="diary">
      {this.renderEntries(events)}
    </div>
  }
}
