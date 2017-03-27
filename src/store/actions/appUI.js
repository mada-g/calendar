
export function addDayFilter(filterType, val){
  console.log(filterType + " - " + val);
  return {
    type: "ADD_DAY_FILTER",
    filterType,
    val
  }
}

export function removeDayFilter(filterType, val){
  return {
    type: "REMOVE_DAY_FILTER",
    filterType,
    val
  }
}

export function addMonthFilter(filterType, val){
  console.log(filterType + " - " + val);
  return {
    type: "ADD_DAY_FILTER",
    filterType,
    val
  }
}
