// 種子資料腳本，並且以指令執行腳本，建立種子資料。

const bcrypt = require('bcryptjs')
// 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('./../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results
const User = require('../../models/user')
const userList = require('./seedUser.json').users


db.once('open', () => {
  console.log('start seeding')
  // 先將資料載完，再進入後面程序
  Promise.all(
    userList.map(user => {
      const { name, email, password, ownRestaurants } = user
      // hashSync(data, salt)
      return User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) })
        .then(user => {
          // 載入餐廳json，用map展開，並將user.id綁定
          const restaurants = ownRestaurants.map(index => {
            // restaurantList[index]:每個餐廳的位置(user1擁有restaurant.json的第0,1,2號位置。)
            const ownRestaurant = restaurantList[index]
            // 綁定userId
            ownRestaurant.userId = user._id
            // 回傳已綁訂好id的餐廳
            return ownRestaurant
          })
          // 將餐廳資料推到資料庫
          return Restaurant.insertMany(restaurants)
        })
    })
  )
    .then(() => {
      console.log('Seeds done!')
      db.close()
    })
    .catch(error => console.log(error))
    // 不加finally，程序會跳太快，直接關掉。
    .finally(() => process.exit())

})