let doc = {
  username: "Mada",
  password: "babous",
  uid: "userMada",
  months: [
    {
      year: 2017,
      month: 1,
      days: [{metaD: "meta1", events: "event111", eId: "id001"}, {metaD: "meta2", events: "event222", eId: "id002"}, {metaD: "meta3", events: "event33", eId: "id003"}]
    },
    {
      year: 2016,
      month: 7,
      days: [{metaD: "meta11", events: "et111", eId: "id01"}, {metaD: "meta22", events: "event222", eId: "id002"}, {metaD: "meta33", events: "event33", eId: "id003"}]
    },
    {
      year: 2017,
      month: 4,
      days: [{metaD: "meta111", events: "e", eId: "id1"}, {metaD: "meta222", events: "event222", eId: "id002"}, {metaD: "meta333", events: "event33", eId: "id003"}]
    }
  ]
}


function genRand(min, range){
  return Math.floor(Math.random() * range) + min;
}

function buildData(num){
  let obj = {
    username: "Mada",
    password: "babous",
    uid: "userMada",
    days: [
      {year: 2017, month: 2, dayNum: 20, eId: "aa11", metaD: "meta99999", events: "e"},
      {year: 2017, month: 2, dayNum: 22, eId: "bb22", metaD: "meta44444", events: "e"}
    ]
  };

  for(let i = 0; i < num; i++){
    obj.days.push({
      year: genRand(2012, 6),
      month: genRand(0, 12),
      dayNum: genRand(0, 27),
      eId: "id001",
      events: "e",
      metaD: ("meta" + genRand(0,100))
    })
  }

  return obj;
}

export default buildData;
