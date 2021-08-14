const router = require('koa-router')()
const Order = require('../../dbs/models/order');
const mongoose =  require('mongoose');
const utils = require('../../utils')
router.prefix('/goldAccount')  //前缀

// 处理订单 添加逻辑
const checkOrder = function(option,ctx){
   if(option.role === 2){ //农户 
     if(!option.p_user_id){
       ctx.body = Object.assign(utils.statusErrror,{msg:'无关联的商户id'})
       return false
     }
     if(!option.weight){
      ctx.body = Object.assign(utils.statusErrror,{msg:'请填写重量'})
      return false
     }
   }  
   if(!option.product_type){
    ctx.body = Object.assign(utils.statusErrror,{msg:'请选择商品种类'})
    return false
   }    
   if(!option.user_id){
    ctx.body = Object.assign(utils.statusErrror,{msg:'无角色id'})
    return false
   }
   return true
}
const setInxId = async function (){
  const lastList = await  mongoose.model('order').find({}).sort({_id:-1}).limit(1);
  if(lastList.length>0){
       const obj = lastList[0];
       return obj.orderId+1;
  }else{
    return 0;
  }
}
const addOrder = function (opt){
    return new Order(opt);
}

router.post('/addOrder', async function(ctx,next){
   const body = ctx.request.body;
   console.log(body);
   const state = await checkOrder(body,ctx);
   if(!state){
     return;
   }
 
   const date = utils.sdFormat();
   const order = addOrder({
     orderId:date.time,//订单id
     role:body.role || 1,//1商户2农户
     name:body.name, //当前角色的名称
     p_user_id:body.p_user_id , //商人id
     c_user_id:body.c_user_id,  //农户id
     p_order_id:body.p_user_id , //如果在农户的情况下需要有商户的关联 商户为空或者0
     user_id:body.user_id,  //当前角色的id
     product_type:body.product_type, //商品种类
     product_type_id:body.product_type_id,
     weight:body.weight,  //重量
     amount_money:body.amount_money,//金额，
     time:date.time,
     time_day:date.day,//时间
     time_hour:date.hour,
     state:1,//状态  1//正常 0//已删除废弃订单（历史）//
     history:[{
       time:date.format
     }]
   });
   try{
    await order.save();
    console.log('baoc');
    ctx.body = utils.statusSuccess;
   }catch(e){
    ctx.body = Object.assign({},utils.statusErrror,{msg:''})
   }
  
});


router.post('/searchList', async function(ctx,next){
  const body = ctx.request.body;
  const list = await utils.serchList('order',{...body,state:1});
  try{
    ctx.body =Object.assign( {},utils.statusSuccess,{
      msg:'成功',
      data:list
    })
  }catch(e){
   ctx.body = Object.assign({},utils.statusErrror,{msg:'搜索错误'})
  }
})

router.post('/order_editor', async function(ctx,next){
  const body = ctx.request.body;
  const date = utils.sdFormat();
  let historyArr = [];
  const list = await utils.query('order',{ 
    orderId:body.orderId
  });
  const oldObj = list[0] || {};
  if(list.length >0){
    historyArr = [...oldObj.history,{time:date.format,...body}];
    await utils.update('order',{
      orderId:body.orderId,
    },
    {
      history:historyArr,
      time:date.time,
      time_day:date.day,//时间
      time_hour:date.hour,
      ...body
    });
  }else{
    ctx.body = Object.assign({},utils.statusErrror,{msg:'跟新失败'})
  }
  ctx.body = Object.assign( {},utils.statusSuccess,{
    msg:'成功'
  })
})

router.post('/order_del', async function(ctx,next){
  const body = ctx.request.body;
  const date = utils.sdFormat();
  let historyArr = [];
 
  await utils.update('order',{
    orderId:body.orderId,
  },
  {
    history:historyArr,
    time:date.time,
    time_day:date.day,//时间
    time_hour:date.hour,
    state:0
  });
 
  ctx.body = Object.assign( {},utils.statusSuccess,{
    msg:'成功'
  })
})
module.exports = router
