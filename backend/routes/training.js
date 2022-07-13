var express  = require('express');
var router   = express.Router();
var path = require('path');


router.get('/alone', (req,res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

router.get('/others', (req,res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});


module.exports = router;