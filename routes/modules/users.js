// 使用者登入、註冊等相關頁面
const express = require('express')
const router = express.Router()
const User = require('./../../models/user')


// 登入介面
router.get('/login', (req, res) => {
  res.render('login')
})

// 取得登入
router.post('/login', (req, res) => {

})

// 註冊介面
router.get('/register', (req, res) => {
  res.render(register)
})

// 取得註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
    .catch(err => console.log(err))
})

module.exports = router