import React from 'react';

import ExpandableTextArea from "../../utils/expandableTextArea/expandableTextArea.jsx";

export default class Description extends React.Component{
  constructor(props){
    super(props);
  }

  handleChange = (e) => {
    this.props.setVal(e.target.value);

  }

  render(){
    const {val} = this.props;
    return <div className="eventDialogue_box eventDialogue_desc">
      <div className="label">Event Description</div>
      <textarea value={val} onChange={this.handleChange}/>
    </div>
  }
}


//
