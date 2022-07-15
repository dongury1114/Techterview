var express = require('express');
// var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title : 'Techterview'});
});

router.get('/login', (req,res) => {
  console.log(1);
  // res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

router.get('/logout', (req, res) => {
  req.logout
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;
