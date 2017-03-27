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
    let dayPeople = metaD["people"] || {};
    let filtered = {reg: [], day: []};

    filtered.reg = this.filterOne(reg || [], tags, dayTags);
    filtered.reg = this.filterOne(filtered.reg, people, dayPeople);

    return filtered;
  }

  filterOne = (filtered, arr, allItems) => {
    if(arr.length == 0 || filtered.length == 0) return filtered;
    let t = arr[0];
    let eids = allItems[t] || {};
    let _filtered = filtered.filter(i => eids.hasOwnProperty(i));

    return this.filterOne(_filtered, arr.slice(1), allItems);
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
