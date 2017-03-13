import Router from 'koa-router';

import setupDB from '../db/setup.js';
import publicRoutes from './public-routes.js';
import MonthApi from './api/month.js';
import DayApi from './api/day.js';

export default async function(){

  let router = new Router();

  console.log("setting up...");

  let db = await setupDB();
  console.log("OK");

  //let publicRoutes = PublicRoutes(db);
  let monthApi = MonthApi(db);
  let dayApi = DayApi(db);

  router.use(publicRoutes.routes(), publicRoutes.allowedMethods());
  router.use(monthApi.routes(), monthApi.allowedMethods());
  router.use(dayApi.routes(), dayApi.allowedMethods());

  return router;
}
