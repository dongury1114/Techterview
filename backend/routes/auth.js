var express  = require('express');
var router   = express.Router();
var passport = require('../config/passport');

router.get('/login', (req,res) => {
    res.render('auth/login');
});

router.get('/logout', (req, res) => {
    req.logout
    req.session.destroy();
    res.redirect('/')
})

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/callback',
    passport.authenticate('google'), (req, res) => {
        res.redirect('/');
    }
);

router.get('/kakao',
    passport.authenticate('kakao')
);

router.get('/kakao/callback',
    passport.authenticate('kakao', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;