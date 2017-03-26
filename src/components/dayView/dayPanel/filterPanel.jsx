import React from 'react';

import WordList from '../../utils/wordList/wordList.jsx';

export default class FilterPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = {val : ""};
  }

  readTxt = (txt) => {
    this.setState({val: txt})
  }



  render(){
    const {filterList, addFilter} = this.props;
    const {val} = this.state;

    return <div className="filterPanel">
      <div className="filterPanel_list"> <WordList readValue={this.readTxt} searchData={filterList}/> </div>
      <div className="filterPanel_btn" onClick={() => addFilter(val)}>add</div>

      <TagsField items={filterList}/>

    </div>
  }
}

/*
**  SUB-COMPONENTS
*/

function TagsField(props){
  const {items} = props;
  return <div className="filterPanel_field">
    {items.map(i => <div className="filterPanel_field_item">{i}</div>)}
  </div>
}
