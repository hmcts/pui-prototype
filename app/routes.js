var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
	req.session.destroy();
	res.redirect('/app/signin.html');
});

module.exports = router;