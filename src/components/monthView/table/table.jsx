import React from 'react';

import "./table.scss";

import Row from './row/row.jsx';

export default class Table extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {data, rows, cell} = this.props;
    return <div className="table">
      {!data.length ? null : data.map((d, i) => <Row key={`r-${i}`} cells={d} rowNum={i} cell={cell} />)}
    </div>
  }
}
