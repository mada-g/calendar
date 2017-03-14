
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

  try { res = await db.findOne( {username: "Mada", "days.dId": dId},
                                {"days.$": 1} ); }

  catch (e) { throw e; }

  if(!res || !res["days"] || !res["days"][0]) throw "no data";

  return res["days"][0];
}


export async function update(db, dId){
  let mock = {year: 2011, month: 11, dayNum: 11, dId: dId, metaD: "MMMMMM", events: "EEEEE"};
  let res = null;

  try { res = await db.update( {username:"Mada", "days.dId": dId},
                               {$set: {"days.$": mock}} ); }

  catch (e) { throw e; }

  if(!res || res["nModified"] == 0 ) throw "no update";

  return true;
}

export async function createDay(db, dId){
  let mock = {year: 2010, month: 1, dayNum: 1, dId: dId, metaD: "MMMMMM", events: "EEEEE"};
  let res = null;

  try { res = await db.update( {username:"Mada"},
                               {$push: {"days": mock}} ); }

  catch (e) { throw e; }

  if(!res || res["nModified"] == 0 ) throw "no update";

  return true;
}
