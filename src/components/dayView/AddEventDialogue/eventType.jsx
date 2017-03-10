import React from 'react';

export default class EventType extends React.Component{
  constructor(props){
    super(props);
  }

  handleClick = () => {
    this.props.setVal(!this.props.val);
  }

  render(){
    const {val} = this.props
    return <div className="eventDialogue_box eventDialogue_type">
      <div className="eventDialogue_type_section">
        all day event?
      </div>
      <div className="eventDialogue_type_section">
        <CheckBox handleClick={this.handleClick} val={val}/>
      </div>
    </div>
  }
}


function CheckBox(props){
  const {handleClick, val} = props;
  return <div className="checkbox_custom" onClick={handleClick}>
    {val ? <div className="checkbox_custom_sign"></div> : null}
  </div>
}
