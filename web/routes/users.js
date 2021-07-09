const router = require('koa-router')()
const Person = require('../dbs/models/person')
router.prefix('/users')  //前缀

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = {
    "a":333
  }
})

router.post('/addPerson', async function(ctx,next){
   global.console.log('start',ctx.request.body);
   const person = new Person({
     name:ctx.request.body.name ||"guojinfa",
     age:ctx.request.body.age || 19,
   })
   let code = 0
   try{
    await person.save();
   }catch(e){
    code = 1
   }
   ctx.body = {
     code
   }
})
module.exports = router
