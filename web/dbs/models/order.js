const mongoose =  require('mongoose');

let orderSchema =  new mongoose.Schema({
    testId: String,
    orderId:String,//订单id
    index:Number,//订单索引
    role:Number,//1商户2农户
    name:String, //当前角色的名称
    p_user_id:String , //商人
    c_user_id:String,  //农户
    p_order_id:String,//如果在农户的情况下需要有商户的关联 商户为空或者0
    product_type:Number, //商品种类
    product_type_id:Number, //商品种类
    weight:Number,  //重量
    amount_money:Number,//金额，
    time:Date,//时间
    time_day:String,//时间
    time_hour:String,
    type:String,//预留字段
    state:Number,//状态  1//正常 0//废弃订单（历史）//
    history:Array//修改历史
})
module.exports = mongoose.model('order',orderSchema);