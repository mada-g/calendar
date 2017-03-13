import Router from 'koa-router';

import {fetchMonthData, fetchDayData, update, createDay} from "../../db/queries.js";

export default function(db){
  let router = new Router({prefix : "/day-data"});

  router.get("/read/:eId", async (ctx, next) => {
    let {eId} = ctx.params;
    let response = {status: false, data: null};

    try {
      response = {status: true, data: await fetchDayData(db, eId)};
    } catch (e) {
      console.log(e);
      response = {status: false, data: null};
    }

    ctx.body = response;
  })


  router.get("/save/:eId", async (ctx, next) => {
    let {eId} = ctx.params;
    let response = {status: false};

    try { response = await update(db, eId); }

    catch (e) { console.log(e);
                response = false; }

    ctx.body = {status: response};
  })


  router.get("/create/:eId", async (ctx, next) => {
    let {eId} = ctx.params;
    let response = {status: false};

    try { response = await createDay(db, eId); }

    catch (e) { console.log(e);
                response = false; }

    ctx.body = {status: response};
  })

  return router;
}
