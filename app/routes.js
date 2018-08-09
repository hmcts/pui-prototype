var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
	res.render('index.html');
});

router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;