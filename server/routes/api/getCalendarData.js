import Router from 'koa-router';

let router = new Router({prefix : "/api"});

router.get("/date/:year/:month/:day", (ctx) => {
  const {year, month, day} = ctx.params;
  let str = `${month} ${day}, ${year}`;
  ctx.body = str;
})


export default router;
