var express = require('express');
var router 	= express.Router();
var strPath = 'oct-2020';

router.post( '/' + strPath + '/register-organisation/organisation-sra-check', (req, res) => {
	if (req.body['sra-number'] === '123456') {
		res.redirect('/' + strPath + '/register-organisation/organisation-sra-error');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-address');
	}
});

module.exports = router;