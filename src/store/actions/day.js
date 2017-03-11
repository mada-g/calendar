import shortid from 'shortid';

export function createEvent({duration, title, description, isAllDay}, history){
  return (dispatch) => {
    let eId = shortid.generate();

    if(!isAllDay){
      let [start, end] = duration.map(d => d.map(t => parseInt(t)));
      dispatch({ type: "CREATE_REG_EVENT",
                val: {eId, start, end, title, description, isAllDay} });
    }
    else {
      dispatch({ type: "CREATE_DAY_EVENT",
                val: {eId, title, description, isAllDay} });
    }

    history.push("/");
  }
}
