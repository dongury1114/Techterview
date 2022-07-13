var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../fronted/build/index.html'));
});

router.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

router.get('/logout', (req, res) => {
  req.logout
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;
