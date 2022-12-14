// 首頁路由，home page

const express = require('express')
const router = express.Router()
// 載入restaurants的schema
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .sort({ _id: 'asc' })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => console.error(error))
})


// 搜尋特定餐廳
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keywords = req.query.keyword.trim()

  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      const filterRestaurant = restaurants.filter(
        (data) =>
          data.name.toLowerCase().includes(keywords) ||
          data.category.includes(keywords)
      )
      // 想新增查詢不到的警告。
      res.render('index', { restaurants: filterRestaurant, keywords })
    })
    .catch(err => console.error(err))
})



module.exports = router