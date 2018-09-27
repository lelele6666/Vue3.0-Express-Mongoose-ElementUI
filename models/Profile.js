//创建数据模型
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({
    type:{
        type:String,
    },
    describe:{
        type:String,
    },
    incode:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String,
    },
    // 创建日期
    date:{
        type:Date,
        default:Date.now 
    }
})

/************** 编译模型Model **************/
/**
 * 编译模型： model(name, [schema], [colleciton], [skipInit] )
   参数： name ：标识model的字符串
　　     schema: 即前面定义的Schema对象
　　 collection：要连接的集合名称（如果在Schema对象中没有指定一个集合）
　　 skipInit： 默认为false，如果为true，则跳过初始化过程，创建一个没有连接到数据库的一个简单的Model对象。
 */

Profile = mongoose.model('profile', ProfileSchema,'profile',false)

module.exports = Profile