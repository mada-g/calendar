import React from 'react';

import WordList from '../../utils/wordList/wordList.jsx';

import {strSearch, listFromKeys} from "../../../utils/utils.js";

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
    const {tags, allTags, addTag} = this.props;
    const {txt} = this.state;

    console.log(strSearch("babou", allTags));
    return <div className="eventDialogue_box eventDialogue_addTags">
      <WordList readValue={this.readTxt} searchData={allTags}/>

      <TagsList tags={tags}/>

      <AddTagButton handleClick={() => addTag(txt)}/>

    </div>
  }
}

function AddTagButton(props){
  return <div className="eventDialogue_box eventDialogue_tagButton">
    <div className="eventDialogue_button" onClick={props.handleClick}>Add</div>
  </div>
}


function TagsList(props){
  const {tags} = props;
  let _tags = listFromKeys(tags);
  return <div className="eventDialogue_addTags_list">
    {_tags.map(t => <div className="tagsList_tag" key={"addtag" + t}>{t}</div>)}
  </div>
}
