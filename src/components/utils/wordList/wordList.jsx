import React from 'react';

import "./wordList.scss";

import {strSearch} from "../../../utils/utils.js";

const UP = 38, DOWN = 40, ENTER_KEY = 13;

export default class WordList extends React.Component{
  constructor(props){
    super(props);
    this.state = { val : "" , focus : 0, matchList : [], isInputFocused: false, mouseOver: false};
  }

  setTxtVal = (txt) => {
    this.setState({val : txt});
    this.props.readValue && this.props.readValue(txt);
  }

  genList = (str) => {
    this.setState({ userInput: str, focus:-1, isInputFocused: true});
    if(str.trim().length > 0) this.setState({ matchList : strSearch(str, this.props.searchData || []) });
    else this.setState({ matchList : [] });
  }

  incr = (num, len) => (num+1)%len;
  decr = (num, len) => (3*len + num - 1)%len;

  handleChange = (e) => {
    const str = e.target.value;
    this.setTxtVal(str);
    this.genList(str);
  }

  handleKeyDown = (e) => {
    const {focus, matchList, userInput, isInputFocused} = this.state;

    if(!isInputFocused) {
      this.genList(this.state.val);
      return;
    }

    if(matchList <= 0) return;

    const _matchList = [...matchList, userInput];
    if(e.keyCode == DOWN || e.keyCode == UP){
      e.preventDefault();
      let len = _matchList.length;
      let f=0;
      if(e.keyCode == DOWN) f = this.incr(focus, len);
      else if(e.keyCode == UP) f = this.decr(focus, len);

      this.setState({ focus: f});
      this.setTxtVal(_matchList[f]);
    }

    else if(isInputFocused && e.keyCode == ENTER_KEY){
      e.preventDefault();
      this.setState({isInputFocused:false, focus:-1, mouseOver:false});
    }
  }

  handleFocus = isFocus => e => {
    !this.state.mouseOver && this.setState({isInputFocused : isFocus, focus:-1})
    if(isFocus) {console.log("gen.."); this.genList(this.state.val);}
  }

  handleMouse = f => e => this.setState({focus : f, mouseOver : (f>-1)});
  handleItemClick = f => e => { this.setState({isInputFocused: false, mouseOver:false});
                                this.setTxtVal(this.state.matchList[f]); }

  renderList = (arr) => {
    if(arr.length == 0) return null;
    const {focus} = this.state;
    return arr.map((item, i) => {
      return <div key={"wlistI"+i}
                  className={`wordList_item ${i===focus ? "focused":""}`}
                  onMouseOver={this.handleMouse(i)}
                  onMouseOut={this.handleMouse(-1)}
                  onClick={this.handleItemClick(i)}>
        {item}
      </div>
    })
  }

  render(){
    const {val, matchList, isInputFocused} = this.state;

    return <div className="wordList">
      <input type="text"
             value={val}
             onBlur={this.handleFocus(false)}
             onClick={this.handleFocus(true)}
             onChange={this.handleChange}
             onKeyDown={this.handleKeyDown}/>
      {isInputFocused ? <div className="wordList_dropdown">{this.renderList(matchList)}</div> : null}
    </div>
  }
}
