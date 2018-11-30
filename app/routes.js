var express = require('express');
var router  = express.Router();

router.use('/', require('./routes/mvp/manage-organisation'));
router.use('/', require('./routes/experimental'));

router.get('/', function (req, res) {
	res.render('index.html');
});

router.get('/sign-out', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;