import Router from 'koa-router';

import {unpackMonthData} from "../../utils/formatData.js";
import {fetchMonthData, fetchDayData, update} from "../../db/queries.js";

export default function(db){
  let router = new Router({prefix : "/month-data"});

  router.get("/:year/:month", async (ctx, next) => {
    let {year, month} = ctx.params;
    year = parseInt(year); month = parseInt(month);
    let response = {status: false, data: null};

    try {
      let data = unpackMonthData(await fetchMonthData(db, year, month));
      console.log(data);
      response = {status: true, data};
    } catch (e) {
      console.log(e);
      response = {status: false, data: null};
    }

    ctx.body = response;
  })

  return router;
}
