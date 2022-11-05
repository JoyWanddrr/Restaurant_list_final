// 總路由，記得根據RESTful改寫app.js的路由edit，delete
// 記得安裝npm install method-override@3.0.0


const express = require('express')
const router = express.Router()

// 引入home模組程式碼(router)
const home = require('./modules/home')
// 引入restaurants模組(router)
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')


router.use('/', home)
// restaurants路由
router.use('/restaurants', restaurants)
router.use('/users', users)



// 匯出路由器
module.exports = router