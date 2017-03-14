import koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import cors from 'koa-cors';
import views from 'koa-views';

import Routes from "./routes";


async function setup(){

  const app = new koa();

  app.use(cors({origin: "http://localhost:8080"}));
  app.use(views("./public", {map:{html:"hogan"}} ));
  app.use(serve("public"))

  let routes = null;
  try{
    routes = await Routes();
  } catch(err) {
    console.log(err);
  }

  app.use(routes.routes(), routes.allowedMethods());

  /*
  app.use(calendar.routes());
  app.use(api.routes());
  app.use(api.allowedMethods());
  */

  app.listen(3000, () => console.log("server running..."));
}

setup();
