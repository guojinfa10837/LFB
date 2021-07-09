const router = require('koa-router')()
const Order = require('../../dbs/models/order')
router.prefix('/goldAccount')  //前缀

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = {
    "a":333
  }
})

router.post('/addOrder', async function(ctx,next){
   global.console.log('start',ctx.request.body);
   const order = new Order({
     name:ctx.request.body.name,
     pname:ctx.request.body.pname,
     p_user_id:ctx.request.body.p_user_id, 
     user_id:ctx.request.body.userId,
     product_type:ctx.request.body.product_type,
     age:ctx.request.body.age,
   })
   let code = 0
   try{
    await order.save();
   }catch(e){
    code = 1
   }
   ctx.body = {
     code
   }
})
module.exports = router
