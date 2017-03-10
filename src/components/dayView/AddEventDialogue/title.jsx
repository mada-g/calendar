import React from 'react';

export default class Title extends React.Component{
  constructor(props){
    super(props);
  }

  handleChange = (e) => {
    this.props.setVal(e.target.value);
  }

  render(){
    const {val} = this.props;
    return <div className="eventDialogue_box eventDialogue_title">
      <div className="label">Event Title</div>
      <input type="text" value={val} onChange={this.handleChange}/>
    </div>
  }
}
