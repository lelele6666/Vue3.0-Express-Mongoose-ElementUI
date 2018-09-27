const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const secret = require('../../config/keys').secretOrKey

//引入加密的包给password进行加密 && 进行数据库和前端的密码比较
const bcrypt = require('bcrypt');

//引入公认头像的模块
const gravatar = require('gravatar');

//引入获得token的模块
const jwt = require('jsonwebtoken')

//$route  GET api/users/test
// 返回请求的json数据
// public
router.get('/test',(req,res) => {
    res.json({msg:'login works'})
})

//$route  POST  api/users/register
// 返回请求的json数据
// public
router.post('/register',(req,res) => {
    // console.log(req.body)
    //查询数据库里是否有这个邮箱
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({email:'邮箱已经被注册！'})
            }else{
                const avatar = gravatar.url(req.body.email,{s: '200', r: 'pg', d: 'mm'})

                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    avatar
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if(err) throw err;

                        newUser.password = hash;
                        //调用存储方法
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    });
                });
            }
        })
})

// $route  POST api/users/login
// 返回token jwt passport
// public

router.post('/login',(req,res) => {
    const email = req.body.email
    const password = req.body.password

    //查询数据库，如果user不存在，返回状态码404
    User.findOne({email})
        .then((user) => {
            if(!user){
                return res.status(404).json({email:'用户不存在'})
            }

            //进行密码的匹配
            /**
             * password 是前端发送来的
             * user.password 是数据库里存已经hash的
             */
            
            bcrypt.compare(password,user.password)
                .then(isMatch => {
                    if(isMatch){
                        //返回token，
                        //jwt.sign('规则','加密名字','过期时间是个对象','箭头函数')
                        const rule = {id:user.id,name:user.name}
                        jwt.sign(rule,secret,{expiresIn:3600},(err,token) => {
                            if(err){
                                throw err
                            }else{
                                res.json({
                                    success:true,
                                    // token:'zhangyu'+token
                                    token:'Bearer '+token
                                })
                            }
                        });

                        // res.json({msg:'success'})
                    }else{
                        return res.status(400).json({password:'密码错误'})
                    }
                })
            
        })
})

// token是一个钥匙想访问数据库的时候必须带着token
// $route  GET api/users/current
// 返回一个 return current user
// private

// router.get('/current','验证token',(req,res) => {})
// 引入passport 模块
const passport = require('passport')

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    // res.json({msg:'success'})
    res.json({
        id:req.user.id,
        name:req.user.name,
        password:req.user.password
    })
})


module.exports = router