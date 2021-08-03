const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/database")
const passport = require("passport")
const { User } = require("../models/users")
// passport middleware

const userAuth = passport.authenticate("jwt", {session: false})

// check role middleware 

const checkRole = roles => (req, res, next) => {
    !roles.includes(req.user.role) ? res.status(401).json("This user role is: UNAUTHORIZED") 
    : next()
}

// user pre-config

const preConfig = async (req, res, next) => {
const password = 'password'
const hashPassword = await bcrypt.hash(password, 12); 
const restricted = new User({email: 'restricted@webbiskools.com', password: hashPassword, role: 'restricted'})
const viewer = new User({email: 'viewer@webbiskools.com', password: hashPassword, role: 'viewer'})
const editor = new User({email: 'editor@webbiskools.com', password: hashPassword, role: 'editor'})


// restricted.save()  
// viewer.save()
// editor.save()

}

preConfig()

// check if user is in database

const userLogin = async (details, res) => {
    let {email, password} = details

    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({
            success: false,
            msg: 'User does not exist'
        })
    }

    let passwordMatch = await bcrypt.compareSync(password, user.password); 

    if (passwordMatch) {
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            email: user.email
        },
        config.secret, 
        {expiresIn: '7 days'});

        let result = {
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        }

        return res.status(200).json({
            success: true,
            msg: 'Logged In.',
            result: result,
            'token': token
        })
    } else {
        return res.status(403).json({
            success: false,
            msg: 'Incorrect Password'

        })
    }
}

module.exports = {
    userLogin,
    checkRole,
    userAuth
}