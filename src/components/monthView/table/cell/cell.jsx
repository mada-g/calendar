import React from 'react';

import "./cell.scss";

export default class Cell extends React.Component{
  constructor(props){
    super(props);
  }

  renderCellContent = ({cell, data, rowNum, colNum}) => {
    return React.cloneElement(cell, {data, rowNum, colNum});
  }

  render(){
    const {data, rowNum, colNum, cell} = this.props;
    return <div className="table_cell cells">
      <div className="cell-content">
        {this.renderCellContent(this.props)}
      </div>
    </div>
  }
}
