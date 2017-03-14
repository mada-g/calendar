export function unpackMonthData(data){
  if(!data || data.length <= 0) throw "no data";

  let obj = {};

  data.forEach(d => {
    let k = "d" + d["dayNum"];
    obj[k] = {metaD: JSON.parse(d["metaD"]), dId: d["dId"]};
  })

  return obj;
}

export function unpackDayData(data){
  if(!data) throw "no data";

  let eventsData = JSON.parse(data["eventsData"]);
  let metaD = JSON.parse(data["metaD"]);

  return {
    year: data["year"], month: data["month"], day: data["dayNum"],
    dId: data["dId"],
    metaD: metaD,
    eids: eventsData["eids"],
    filtered: eventsData["filtered"],
    events: eventsData["events"]
  }

}
