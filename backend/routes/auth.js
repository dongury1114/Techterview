var express  = require('express');
var router   = express.Router();
var passport = require('../config/passport');

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