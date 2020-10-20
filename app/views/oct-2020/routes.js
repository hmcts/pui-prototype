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

router.post( '/' + strPath + '/register-organisation/organisation-address-another-check', (req, res) => {
	if (req.body['add-another'] === 'yes') {
		res.redirect('/' + strPath + '/register-organisation/organisation-address-another-name');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-pba');
	}
});

module.exports = router;