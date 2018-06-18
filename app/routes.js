var express = require('express');
var router  = express.Router();

router.use('/', require('./routes/jui'));

router.get('/', function (req, res) {
	req.session.destroy();
	res.redirect('/app/dashboard');
});

module.exports = router;