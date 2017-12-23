const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/home', (req, res) => {
  res.redirect('index');
});

router.get('/about', (req, res) => {
  res.render('about', { user: req.user });
});

router.get('/profile', (req, res) => {
  res.render('profile', { user: req.user });
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/signup', (req, res) => {
  res.render('signup', { user: req.user });
});

router.get('/rewards', (req, res) => {
  res.render('rewards', { user: req.user });
});

module.exports = router;
