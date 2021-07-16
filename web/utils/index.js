const mongoose =  require('mongoose');


const SDTime  = require("silly-datetime"); //处理时间格式化


const sdFormat = function(){
    const data = new Date()
    return {
        day:SDTime.format(data, 'YYYY-MM-DD'),
        hour:SDTime.format(data, 'HH:mm'),
        time:data.getTime(),
        format:SDTime.format(data, 'YYYY-MM-DD HH:mm:ss')
    }
}
const statusSuccess= {
    status:'success',
    msg:'请求成功！'
}
const statusErrror= {
    status:'error',
    msg:'请求成功！'
}

//更新
const update = function (_model, oldData, newData) {
	return new Promise(function(resolve, reject) {
        mongoose.model(_model).update(oldData, newData, (err, data) => {
			if(err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

const updateOne = function(_model, oldData, newData)  {
	return new Promise(function(resolve, reject) {
        mongoose.model(_model).updateOne(oldData, newData, function(err, data) {
			if(err) {
				reject(err);
			}
			resolve(data);
		});
	});
};
const save = function(_model)  {
	return new Promise(function(resolve, reject)  {
        mongoose.model(_model).save(function(err, data)  {
			if(err) {
				reject(err);
			}
			resolve(data);
		});
	});
};
const query = function(_model, _query = {}) {
    return new Promise(function(resolve, reject)  {
        mongoose.model(_model).find(_query,function (err, res)  {
           if(err) {
                  reject(err)
            }
            resolve(res)
          });
    });
};
module.exports = {
    statusSuccess,
    statusErrror,
    sdFormat,
    update,
    query,
    save
}