const {User} = require('../models/users')
const config = require("../config/database")
const { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}

module.exports = (passport) => {
    passport.use(new Strategy(opts, async(payload, done) => {
        await User.findById(payload.user_id).then(async user => {
            if(user) {
                return done(null, user);
            }
            return done(null, false)
        }).catch((err) => {
            return done(null, false)
        })
    }))
}