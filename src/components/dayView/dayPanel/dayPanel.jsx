import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Map, toJS} from 'immutable';

import actions from '../../../store/actions.js';
import {listFromKeys} from '../../../utils/utils.js';

import "./dayPanel.scss";
import FilterPanel from './filterPanel.jsx';

class DayPanel extends React.Component{
  constructor(props){
    super(props);
  }

  addFilter = (type) => (val) => this.props.addDayFilter(type, val);
  removeFilter = (type) => (val) => this.props.removeDayFilter(type, val);

  render(){
    const {toggleEventDialogue, allTags, tags, people, filter} = this.props;

    return <div className="dayPanel">
      <Link to="/newevent"><AddEventButton handleClick={toggleEventDialogue}/></Link>
      <div className="dayPanel_box"> <FilterBasket removeFilter={this.removeFilter} items={filter}/> </div>
      <div className="dayPanel_box"> <FilterPanel addFilter={this.addFilter("tags")} filterList={tags}/> </div>
      <div className="dayPanel_box"> <FilterPanel addFilter={this.addFilter("people")} filterList={people}/> </div>
    </div>
  }
}

/*
** SUB-COMPONENTS
*/


function AddEventButton(props){
  const {handleClick} = props;
  return <div className="dayPanel_AddEvent" onClick={handleClick}>
    add an event
  </div>
}

function FilterBasket(props){
  const {items: {tags, people}, removeFilter} = props;
  return <div className="filterBasket">
    <div>
      {tags.map(t => <div className="FilterBasket_item" onClick={() => removeFilter("tags")(t)}>{t}</div>)}
    </div>
    <div>
      {people.map(p => <div className="FilterBasket_item" onClick={() => removeFilter("people")(p)}>{p}</div>)}
    </div>
  </div>
}


function mapState(state){
  let _tags = state.getIn(["viewDay", "metaD", "tags"], Map()).toJS();
  let _people = state.getIn(["viewDay", "metaD", "people"], Map()).toJS();

  return {
    tags: listFromKeys(_tags),
    people: listFromKeys(_people)
  }
}

export default connect(mapState, actions)(DayPanel);
