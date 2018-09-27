//搭建express服务
const express = require('express')
const app = express()
app.get('/',(req,res) => {res.send('hello zhangy')})
const port = process.env.PORT || 7000
app.listen(port,() => {
    console.log('server is running')
})

//连接数据库
const mongoose = require('mongoose')
const db = require('./config/keys').mongooseURI
mongoose.connect(db)
    .then(() => {console.log('mongoose is running')})
    .catch((err) => {console.log(err)})

// 引入处理post数据的模块
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//引入路由
const users = require('./routers/api/user')

//使用路由get请求，请求地址为127.0.0.1:7000/api/users/test
app.use('/api/users',users)

//引入文件模块
const fs = require('fs')
//引入处理路径模块
const path = require('path')
//因为是单页面应用，所有的请求都走/dist/index.html
app.get('*',(req,res) => {
    const html = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),'utf-8')
})

//引入passport模块验证token
const passport = require('passport')
//需要进行初始化
app.use(passport.initialize())
//通过引入 passort文件来实现代码的抽离
require('./config/passport')(passport)

