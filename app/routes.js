const express = require('express');
const router  = express.Router();

router.use('/', require('./routes/common'));
router.use('/', require('./routes/questions'));
router.use('/', require('./routes/divorce'));

router.get('/', function (req, res) {
	req.session.destroy();
	res.render('index');
});

module.exports = router;