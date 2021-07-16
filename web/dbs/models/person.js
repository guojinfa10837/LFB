const mongoose =  require('mongoose');

let personSchema =  new mongoose.Schema({
    name:String,
    mobile:String, //手机号
    user_id:String,
    role:Number, //1商户2农户
    type:String,//预留字段
    state:String,//状态  //可以用来角色权限管理
    time:'',//时间
})

module.exports = mongoose.model('Person',personSchema);