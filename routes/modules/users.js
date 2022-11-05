// 使用者登入、註冊等相關頁面
const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('./../../models/user')


// 登入介面
router.get('/login', (req, res) => {
  res.render('login')
})

// 取得登入，加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊介面
router.get('/register', (req, res) => {
  res.render('register')
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

// 登出(use POST or DELETE)
router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})


module.exports = router