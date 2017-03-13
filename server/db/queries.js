
export async function fetchMonthData(db, year, month){
  let res = null;
  let selectedFields = { "metaD"  : "$days.metaD",
                         "eId"    : "$days.eId",
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

export async function fetchDayData(db, eId){
  let res = null;

  try { res = await db.findOne( {username: "Mada", "days.eId": eId},
                                {"days.$": 1} ); }

  catch (e) { throw e; }

  if(!res || !res["days"] || !res["days"][0]) throw "no data";

  return res["days"][0];
}


export async function update(db, eId){
  let mock = {year: 2011, month: 11, dayNum: 11, eId: eId, metaD: "MMMMMM", events: "EEEEE"};
  let res = null;

  try { res = await db.update( {username:"Mada", "days.eId": eId},
                               {$set: {"days.$": mock}} ); }

  catch (e) { throw e; }

  if(!res || res["nModified"] == 0 ) throw "no update";

  return true;
}

export async function createDay(db, eId){
  let mock = {year: 2010, month: 1, dayNum: 1, eId: eId, metaD: "MMMMMM", events: "EEEEE"};
  let res = null;

  try { res = await db.update( {username:"Mada"},
                               {$push: {"days": mock}} ); }

  catch (e) { throw e; }

  if(!res || res["nModified"] == 0 ) throw "no update";

  return true;
}
