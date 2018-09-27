const JwtStrategy = require('passport-jwt').Strategy,
       ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

const mongoose = require('mongoose')
const User = mongoose.model('users')
//jwt的key
const keys = require('../config/keys')
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
        // console.log(jwt_payload)
        //查询数据库
        User.findById(jwt_payload.id)
            .then((user) => {
                if(user){
                    return done(null,user)
                }else{
                    return done(null,false)
                }
            })
            .catch(err => {console.log(err)})
    }));
}
