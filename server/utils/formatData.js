export function unpackMonthData(data){
  if(!data || data.length <= 0) throw "no data";

  let obj = {};

  data.forEach(d => {
    let k = "d" + d["dayNum"];
    obj[k] = {metaD: JSON.parse(d["metaD"]), dId: d["dId"]};
  })

  return obj;
}

export function unpackDayData(_data){
  if(!_data) throw "no data";

  let obj = {};

  console.log(_data);

  if(_data["tags"]) obj.allTags = _data["tags"];

  if(_data["days"] && _data["days"][0]){
    let data = _data["days"][0];
    let eventsData = JSON.parse(data["eventsData"]);
    let metaD = JSON.parse(data["metaD"]);

    Object.assign(obj, {
      date: { year: data["year"], month: data["month"], day: data["dayNum"] },
      dId: data["dId"],
      metaD: metaD,
      eids: eventsData["eids"],
      filtered: eventsData["filtered"],
      events: eventsData["events"]
    });
  }

  return obj;
}

export function packDayData(dId, data){
  if(!data) throw "no data";

  let _tags = [];

  console.log(data);
  let _date = data["date"];

  let dayTags = data["metaD"]["tags"] || {};

  for(let k in dayTags)
    if(dayTags.hasOwnProperty(k)) _tags.push(k);

  let obj = {
    main: {
      eventsData: JSON.stringify({
        eids: data["eids"],
        filtered: data["filtered"],
        events: data["events"]
      }),
      metaD: JSON.stringify(data["metaD"]),
      dayNum: _date["dayNum"], month: _date["month"], year: _date["year"],
      dId: dId
    },

    tags: _tags
  }

  return obj;
}
