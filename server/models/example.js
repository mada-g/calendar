
let metaD = {
  titles: [],
  tags: {
    "tagID" : {"eid": true}
  },
  people: {
    "person" : {"eid": true}
  }
}

let eventsData = {
  eids: {day: [], reg: ["ijV30x9"]},
  filtered: {day: [], reg: []},

  events: {
    "ijV30x9": {start: [9,15], end: [10,10], isAllDay: false, description: "", title: "Mia's meeting", tags: []}
  }
}

function genRand(min, range){
  return Math.floor(Math.random() * range) + min;
}

function buildData(num){

  let _metaD = JSON.stringify(metaD);
  let _eventsData = JSON.stringify(eventsData);

  let obj = {
    username: "Mada",
    password: "babous",
    uid: "userMada",
    tags: [],
    people: [],
    days: [
      {year: 2017, month: 2, dayNum: 20, dId: "y2017m2d20", metaD: _metaD, eventsData: _eventsData},
      {year: 2017, month: 2, dayNum: 22, dId: "y2017m2d22", metaD: _metaD, eventsData: _eventsData}
    ]
  };

  for(let i = 0; i < num; i++){
    let year   = genRand(2012, 6),
        month  = genRand(0, 12),
        dayNum = genRand(0, 27);

    obj.days.push({
      year, month, dayNum,
      dId: `y${year}m${month}d${dayNum}`,
      eventsData: _eventsData,
      metaD: _metaD
    })
  }

  return obj;
}

export default buildData;
