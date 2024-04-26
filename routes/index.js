var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts');
const passport = require('passport');
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))

router.get('/' , function (req, res, next) {
  res.render('index');
});
router.get('/login', function (req, res, next) {
  const error = req.flash('error')
  console.log(error)
  res.render('login', {error});
});
router.get('/profile', isLoggedIn, async function (req, res, next) {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user  // this store the username once you are logged in
    })
      if(!user) {
        return res.send(404);
      }
      res.render('profile', {user});
  }
   catch (error) {
    console.error(error);
  }
})

router.get('/homepage', isLoggedIn, function (req, res, next) {
  res.render('homepage');
})
router.post('/register', function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/profile', {username})
      })
    })
})

router.post('/login', passport.authenticate("local", {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}
module.exports = router;
