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
		res.redirect('/' + strPath + '/register-organisation/organisation-address');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-pba');
	}
});

router.post( '/' + strPath + '/register-organisation/organisation-address-add', (req, res) => {

	var addresses = req.session.data.addresses || [];
	var addressNo = addresses.length + 1;
	var addressAddress1 = (req.session.data['address_Line1']) ? req.session.data['address_Line1'] : '-'
	var addressAddress2 = (req.session.data['address_Line2']) ? req.session.data['address_Line2'] : ''
	var addressTown = (req.session.data['address_city']) ? req.session.data['address_city'] : ''
	var addressPostcode = (req.session.data['address_Postcode']) ? req.session.data['address_Postcode'] : ''
	var address = addressAddress1 + ', ' + addressAddress2 + ', ' + addressTown + ', ' + addressPostcode

	var addressDX = (req.session.data['dx-number']) ? req.session.data['dx-number'] : ''
	var addressDXExchange = (req.session.data['dx-exchange']) ? req.session.data['dx-exchange'] : ''

	addresses.push({'addressNo': addressNo, 'address': address, 'addressDX': addressDX, 'addressDXExchange': addressDXExchange })
	req.session.data.addresses = addresses

	res.redirect('/' + strPath + '/register-organisation/organisation-address-another');

});

module.exports = router;