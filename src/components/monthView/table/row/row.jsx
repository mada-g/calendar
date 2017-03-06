import React from 'react';

import "./row.scss";

import Cell from '../cell/cell.jsx';

export default class Row extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {cells, rowNum, cell} = this.props;
    return <div className="table_row rows">
      {!cells.length ? null : cells.map((c, i) => <Cell key={`c-${rowNum}-${i}`} data={c} rowNum={rowNum} colNum={i} cell={cell}/>)}
    </div>
  }
}
