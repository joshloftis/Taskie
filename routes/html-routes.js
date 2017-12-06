const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', { user: req.user });
});

router.get('/home', (req, res, next) => {
  res.redirect('index');
});

router.get('/about', (req, res, next) => {
  res.render('about', { user: req.user });
});

router.get('/profile', (req, res, next) => {
  res.render('profile', { user: req.user });
});

router.get('/login', (req, res, next) => {
  res.render('login', { user: req.user });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { user: req.user });
});

router.get('/rewards', (req, res, next) => {
  res.render('rewards', { user: req.user });
});

module.exports = router;
