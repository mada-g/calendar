import Router from 'koa-router';

import {unpackDayData} from "../../utils/formatData.js";
import {fetchMonthData, fetchDayData, update, createDay} from "../../db/queries.js";

export default function(db){
  let router = new Router({prefix : "/day-data"});

  router.get("/read/:year/:month/:day", async (ctx, next) => {
    let {year, month, day} = ctx.params;

    let dId = `y${year}m${month}d${day}`;

    let response = {status: false, data: null};

    try {
      let data = unpackDayData(await fetchDayData(db, dId));
      console.log(data);
      response = {status: true, data: data};
    } catch (e) {
      console.log(e);
      if(e === "no data") response = {status: true, data: null};
      else response = {status: false, data: null};
    }

    ctx.body = response;
  })


  router.get("/save/:dId", async (ctx, next) => {
    let {dId} = ctx.params;
    let response = {status: false};

    try { response = await update(db, dId); }

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
