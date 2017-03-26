import React from 'react';

import "./diary.scss";
import {listFromKeys} from '../../../utils/utils.js';
import DiaryEntry from '../diaryEntry/diaryEntry.jsx';

export default class Diary extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillReceiveProps = (newProps) => {
    const {metaD} = newProps.daydata;
  }

  filterEntries = () => {
    const {eids: {reg}, events, metaD} = this.props.daydata;
    const {filter: {tags, people}} = this.props;

    let dayTags = metaD["tags"] || {};
    let filtered = {reg: [], day: []};

    let filtered.reg = this.filterByTag(reg || [], tags, dayTags);

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

  renderEntries = (eids, events) => {
    return eids.map((eid) => {
      return <DiaryEntry data={events[eid]}/>
    })
  }

  render(){
    this.filterEntries();
    const {eids: {reg}, events} = this.props.daydata;
    return <div className="diary">
      {this.renderEntries(reg, events)}
    </div>
  }
}
