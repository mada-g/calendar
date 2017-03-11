import React from 'react';

import WordList from '../../utils/wordList/wordList.jsx';

import {strSearch} from "../../../utils/utils.js";

const arr = ["hello", "ello", "mello", "hell", "help", "melon", "elp", "helico", "melt"];

export default class AddTags extends React.Component{
  constructor(props){
    super(props);
    this.state = {txt : ""};
  }

  readTxt = (txt) => {
    this.setState({txt : txt});
  }

  render(){
    const {tags, tagsList} = this.props;
    console.log(strSearch("babou", tagsList));
    return <div className="eventDialogue_box eventDialogue_addTags">
      <WordList readValue={this.readTxt} searchData={arr}/>
      <div className="eventDialogue_addTags_txt">
        {this.state.txt}
      </div>
    </div>
  }
}
