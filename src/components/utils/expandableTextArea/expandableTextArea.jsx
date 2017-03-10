import React from 'react';

import "./expandableTextArea.scss";

export default class ExpandableTextArea extends React.Component{

  constructor(props){
    super(props);
    this.state = {txt : ""};
    this.visibleArea;
    this.inputArea;
  }

  componentDidUpdate(prevProps, prevState){
    this.inputArea.style.height = this.visibleArea.offsetHeight + "px";
  }

  handleChange = (e) => {
    this.setState({txt : e.target.value});
  }

  render(){
    return <div className="expandableTextArea">
      <div ref={i => this.visibleArea = i}
           className="txtArea visibleArea"
           onChange={this.handleTxtChange}> {this.state.txt} </div>

         <textarea className="txtArea inputArea"
                value={this.state.txt}
                onChange={this.handleChange}
                ref={t => this.inputArea = t}/>
    </div>
  }
}
