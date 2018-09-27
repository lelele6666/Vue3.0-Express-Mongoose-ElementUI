//创建数据模型
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
    // _id:Schema.Types.ObjectId ,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // 创建头像
    avatar:{
        type:String,
    },
    // // 创建日期
    // date:{
    //     type:Date,
    //     required:true
    // }
})

/************** 编译模型Model **************/
/**
 * 编译模型： model(name, [schema], [colleciton], [skipInit] )
   参数： name ：标识model的字符串
　　     schema: 即前面定义的Schema对象
　　 collection：要连接的集合名称（如果在Schema对象中没有指定一个集合）
　　 skipInit： 默认为false，如果为true，则跳过初始化过程，创建一个没有连接到数据库的一个简单的Model对象。
 */

User = mongoose.model('users', UserSchema,'users',false)

module.exports = User