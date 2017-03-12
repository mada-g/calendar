import koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import views from 'koa-views';

import keys from '../keys.js';
import MongoObj from './db';
import userSchema from './models/user.js';
import calendar from './routes/calendar.js';
import api from './routes/api/getCalendarData.js';

import example from "./models/example.js";


let db = new MongoObj({url: keys.dbUrl, schema: {name: "User", definition: userSchema}})

async function connect(){
  let res = await db.connect();
  console.log(res);
//  console.log(await db.save(example));

  let result = await db.getFields(
    {username:"Mada"},
    {"months": { "$elemMatch":{"year":2016} }, "months.days.metaD":1, "months.year":1, "months.month":1});
  console.log(result);
  console.log("---------------------");
  console.log(result["months"][0]["days"]);
}
connect();

/*db.connect().then(console.log)
            .then(() => db.save({name: "Ma", uid: "sa1n7s"})).then(console.log).catch(console.log);
*/
const app = new koa();

app.use(views("./public", {map:{html:"hogan"}} ));

app.use(serve("public"))

app.use(calendar.routes());
app.use(api.routes());
app.use(api.allowedMethods());

app.listen(3000, () => console.log("server running..."));
