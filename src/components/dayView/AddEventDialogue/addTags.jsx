import React from 'react';

import WordList from '../../utils/wordList/wordList.jsx';

import {strSearch} from "../../../utils/utils.js";

export default class AddTags extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {tags, tagsList} = this.props;
    console.log(strSearch("babou", tagsList));
    return <div className="eventDialogue_box eventDialogue_addTags">
      <WordList />
    </div>
  }
}
