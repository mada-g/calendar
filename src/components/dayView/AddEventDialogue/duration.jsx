import React from 'react';

export default class Duration extends React.Component{
  constructor(props){
    super(props);
    this.state = { val : [["00","00"],["00","00"]] };
  }

  handleTyping = (e,i,j) => {
    let _val = this.state.val.slice();
    _val[i][j] = e.target.value.slice(0,2);
    this.props.setVal(_val);
  }

  validateInput = (e,i,j) => {
    let n = parseInt(this.state.val[i][j]);
    if(isNaN(n) || n < 0 || (j===0 && n > 23) || (j===1 && n>59)) n=0;

    if(n < 10){
      let _val = this.state.val.slice();
      _val[i][j] = "0" + n;
      this.props.setVal(_val);
    }
  }

  renderInput = (i,j) => {
    return <input type="text"
                  onBlur={(e) => this.validateInput(e,i,j)}
                  onChange={(e) => this.handleTyping(e,i,j)}
                  value={this.props.val[i][j]} />
  }


  render(){
    return <div className="eventDialogue_box eventDialogue_duration">
      <div className="eventDialogue_duration_time">
        {this.renderInput(0,0)}
        <div className="sep">:</div>
        {this.renderInput(0,1)}
      </div>
      <div className="eventDialogue_duration_time">
        {this.renderInput(1,0)}
        <div className="sep">:</div>
        {this.renderInput(1,1)}
      </div>
    </div>
  }
}
