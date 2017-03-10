import React from 'react';

import "./wordList.scss";

import {strSearch} from "../../../utils/utils.js";

const UP = 38, DOWN = 40;
const arr = ["hello", "ello", "mello", "hell", "help", "melon", "elp", "helico", "melt"];

export default class WordList extends React.Component{
  constructor(props){
    super(props);
    this.state = { val : "" , focus : 0, matchList : []};
  }


  incr = (num, len) => (num+1)%len;
  decr = (num, len) => (3*len + num - 1)%len;

  handleChange = (e) => {
    const str = e.target.value;
    this.setState({ val : str, userInput: str, focus:-1});
    if(str.trim().length > 0) this.setState({ matchList : strSearch(str, arr) });
    else this.setState({ matchList : [] });
  }

  handleKeyDown = (e) => {
    const {focus, matchList, userInput} = this.state;
    if(matchList.length > 0 && (e.keyCode == DOWN || e.keyCode == UP)){
      const _matchList = [...matchList, userInput];
      let len = _matchList.length;
      let f=0;
      if(e.keyCode == DOWN) f = this.incr(focus, len);
      else if(e.keyCode == UP) f = this.decr(focus, len);

      this.setState({ focus: f, val: _matchList[f] });
    }
  }

  renderList = (arr) => {
    if(arr.length == 0) return null;
    const {focus} = this.state;
    return arr.map((item, i) => {
      return <div key={"wlistI"+i} className={`wordList_item ${i===focus ? "focused":""}`}>
        {item}
      </div>
    })
  }

  render(){
    const {val, matchList} = this.state;

    return <div className="wordList">
      <input type="text" value={val} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
      <div className="wordList_dropdown">
        {this.renderList(matchList)}
      </div>
    </div>
  }
}
