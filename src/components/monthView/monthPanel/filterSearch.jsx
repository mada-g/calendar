import React from 'react';

import WordList from '../../utils/wordList/wordList.jsx';

export default class FilterSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {val:""}
  }

  readTxt = (txt) => this.setState({val : txt});

  renderSearchBox = (filterList, addFilter) => {
    const {val} = this.state;

    return <div className="monthPanel_search_box">
      <div className="monthPanel_search_bar"> <WordList readValue={this.readTxt} searchData={filterList}/> </div>
      <div className="monthPanel_search_button" onClick={() => addFilter(val)}>add</div>
    </div>
  }

  render(){
    const {tags, people, addFilter} = this.props;
    return <div className="monthPanel_filter_search">
      {this.renderSearchBox(tags, addFilter("tags"))}
    </div>
  }
}
