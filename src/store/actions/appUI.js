
export function addDayFilter(filterType, val){
  console.log(filterType + " - " + val);
  return {
    type: "ADD_DAY_FILTER",
    filterType,
    val
  }
}
