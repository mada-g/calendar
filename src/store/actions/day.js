
export function createEvent({duration, title, description, isAllDay}, history){
  return (dispatch) => {
    let [start, end] = duration.map(d => d.map(t => parseInt(t)));

    dispatch({ type: "CREATE_EVENT",
               val: {start, end, title, description, isAllDay} });

    history.push("/");
  }
}
