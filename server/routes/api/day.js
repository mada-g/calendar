import Router from 'koa-router';
import koaBody from 'koa-body';

import {unpackDayData, packDayData} from "../../utils/formatData.js";
import {fetchMonthData, fetchDayData, update, createDay} from "../../db/queries.js";

export default function(db){
  let router = new Router({prefix : "/day-data"});

  router.get("/read/:year/:month/:day", async (ctx, next) => {
    let {year, month, day} = ctx.params;

    let dId = `y${year}m${month}d${day}`;

    let response = {status: false, data: null};

    try {
      let data = unpackDayData(await fetchDayData(db, dId));
    //  console.log(data);
      response = {status: true, data: data};
    } catch (e) {
      console.log(e);
      response = {status: false, data: null};
    }

    ctx.body = response;
  })


  router.post("/save/:dId", koaBody(), async (ctx, next) => {
    console.log("POSTING!")
    let data = ctx.request.body;
    console.log("***************");
    console.log(data);
    console.log("***************");

    let {dId} = ctx.params;
    let response = {status: false};

    let obj = packDayData(dId, data);

    console.log("##########################");
    console.log(obj);
    console.log("##########################");

    try {
      let r = await update(db, obj);
      response = true;
      if(!r){
        try { response = await createDay(db, obj); }
        catch(e) { response = false; }
      }
    }

    catch (e) { console.log(e);
                response = false; }

    ctx.body = {status: response};
  })


  router.get("/create/:dId", async (ctx, next) => {
    let {dId} = ctx.params;
    let response = {status: false};

    try { response = await createDay(db, dId); }

    catch (e) { console.log(e);
                response = false; }

    ctx.body = {status: response};
  })

  return router;
}
