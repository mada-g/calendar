import React from 'react';

import "./monthPanel.scss";

import FilterSearch from './filterSearch.jsx';

export default class MonthPanel extends React.Component{
  constructor(props){
    super(props);
  }

  addFilter = (type) => (val) => this.props.addMonthFilter(type, val);

  render(){
    const {tags} = this.props;

    return <div className="monthPanel">
      <FilterSearch tags={tags} addFilter={this.addFilter}/>
    </div>
  }
}
