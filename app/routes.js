const express = require('express');
const router  = express.Router();


router.use('/', require('./routes/jui'));
router.use('/', require('./routes/cor'));


router.get('/', function (req, res) {
	req.session.destroy();
	res.render('index');
});


module.exports = router;