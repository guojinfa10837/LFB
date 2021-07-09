const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 23!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/testAsync',async (ctx, next) =>{
   global.console.log(new Date().getTime());
   const a = await new Promise((reslove, reject)=>{
      setTimeout(()=>{
        reslove('9999')
      },1000)
   })
   ctx.body = {
     a
   }
})

module.exports = router
