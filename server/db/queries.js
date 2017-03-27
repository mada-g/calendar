
export async function fetchMonthData(db, year, month){
  let res = null;
  let selectedFields = { "metaD"  : "$days.metaD",
                         "dId"    : "$days.dId",
                         "dayNum" : "$days.dayNum" };

  try{
    res = await db.aggregate([
      {$match: {username: "Mada"}},
      {$project: {
        days: {$filter: {
          input: "$days",
          as: "day",
          cond: {$and: [ {$eq: ["$$day.year", year]},
                         {$eq: ["$$day.month", month]} ]}
        }}
      }},
      {$unwind: "$days"},
      {$group: {_id: "$_id", days: {$push: selectedFields }} }
    ])

  } catch (e) { throw e; }

  if(!res[0] || !res[0]["days"] || res[0]["days"].length <= 0) throw "no data";

  return res[0]["days"];
}

export async function fetchDayData(db, dId){
  let res = null;

  console.log(dId);

/*
  try { res = await db.findOne( {username: "Mada", "days.dId": dId},
                                {"days.$": 1, "tags": 1} ); }
*/

  try {
    res = await db.aggregate([
      { $match: {username: "Mada"} },
      {$project: {
        days: {$filter: {
          input: "$days",
          as: "day",
          cond: {$eq: ["$$day.dId", dId]},
        }},
        "tags": 1,
        "people": 1
      }}
    ])
  }

  catch (e) { throw e; }

  if(!res[0]) throw "error";

  return res[0];
}


export async function update(db, data){
  let res = null;
  console.log("%%%%%%%%%%%%%%%%%%%%%");
  console.log(data);
  console.log("%%%%%%%%%%%%%%%%%%%%%");

  try { res = await db.update( {username:"Mada", "days.dId": data.main.dId},
                               {
                                 $set: {"days.$": data.main},
                                 $addToSet: {"tags": {$each: data.tags}, "people": {$each: data.people}}
                               }
                             ); }

  catch (e) { throw e; }

  if(!res) throw "error";

  else if(res["nModified"] == 0 ) return false;
  else return true;
}

export async function createDay(db, data){
  let res = null;

  try { res = await db.update( {username:"Mada"},
                               {
                                 $push: {"days": data.main},
                                 $addToSet: {"tags": {$each: data.tags}, "people": {$each: data.people}}
                               }
                             ); }

  catch (e) { throw e; }

  if(!res || res["nModified"] == 0 ) throw "no update";

  return true;
}
