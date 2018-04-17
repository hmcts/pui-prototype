const express = require('express');
const router  = express.Router();


router.use('/', require('./routes/divorce'));


// Index
router.get('/', function (req, res) {
	res.render('index');
});


// Add your routes here - above the module.exports line
router.post('/v1/get-new-case', function (req, res) {
	req.session.success = true;
	res.redirect('/v1/case');
});


router.get('/v1/case', function (req, res) {
	res.render('v1/case/index', { success: req.session.success });
	req.session.success = null;
});


module.exports = router;