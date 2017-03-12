import Router from 'koa-router';

let router = new Router({prefix : "/calendar"});


router.get("*", async (ctx, next) => {
  //await ctx.render("index.html");
  ctx.body = "calendar";
})


export default router;
