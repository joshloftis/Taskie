const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/profile', authCheck, (req, res, next) => {
    res.render('profile', { user: req.user });
});

router.get('/rewards', authCheck, (req, res, next) => {
    res.render('rewards', { user: req.user });
});


module.exports = router;
