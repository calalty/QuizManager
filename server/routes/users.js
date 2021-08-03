const router = require('express').Router()
const {userLogin, checkRole, userAuth} = require('../middlewares/auth')
const { User } = require('../models/users')

router.post('/api/login', async (req, res) => {
    await userLogin(req.body, res)
})

router.get('/api/profile', userAuth, async (req, res) => {
   let getUser = req.user
   res.send(getUser)
})


module.exports = router