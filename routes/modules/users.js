// 使用者登入、註冊等相關頁面
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('./../../models/user')


// 登入介面
router.get('/login', (req, res) => {
  res.render('login')
})

// 取得登入，加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

// 註冊介面
router.get('/register', (req, res) => {
  res.render('register')
})

// 取得註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '兩次密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      req.flash('warning_msg', 'User already exists.')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => User.create({
        name,
        email,
        password: hash
      })
      )
      .then(() => {
        res.redirect('/')
      })
      .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
})

// 登出(use POST or DELETE)
router.post('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})


module.exports = router