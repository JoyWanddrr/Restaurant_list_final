// restaurants的相關路由，包含修改、刪除、新增

const express = require('express')
const router = express.Router()
// 載入restaurants的schema
const Restaurant = require('../../models/restaurant')


// 新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

// 接住新增餐廳的路由
router.post('/', (req, res) => {
  const userId = req.user._id
  // req.body必須展開，才可以帶入schema
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// detail/show
router.get('/:id', (req, res) => {
  const userId = req.user._id
  // 使用_id是因為使用fineOne不會自動轉換
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))

})


// edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 設定edit接住的路由。
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return Restaurant.findByIdAndUpdate({ _id, userId }, req.body)
    .then((restaurant) => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})


// delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router