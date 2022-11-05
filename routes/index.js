// 記得安裝npm install method-override@3.0.0

const express = require('express')
const router = express.Router()

// 引入home模組程式碼(router)
const home = require('./modules/home')
// 引入restaurants模組(router)
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
// 掛載 middleware，確保登入才能使用
const { authenticator } = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)


// 匯出路由器
module.exports = router