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
	var address = addressAddress1 + ', ' + addressAddress2 + ', ' + addressTown + ', ' + addressPostcode;

	var addressDX = (req.session.data['dx-number']) ? req.session.data['dx-number'] : ''
	var addressDXExchange = (req.session.data['dx-exchange']) ? req.session.data['dx-exchange'] : ''

	addresses.push({'addressNo': addressNo, 'address': address, 'addressDX': addressDX, 'addressDXExchange': addressDXExchange });
	req.session.data.addresses = addresses;

	if ( req.session.data.addNew == "true" ) {
		res.redirect('/' + strPath + '/manage-organisation/organisation-address');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-address-another');
	}

});

router.get( '/' + strPath + '/register-organisation/your-office', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/register-organisation/your-office',  { data: req.session.data} );

});


router.get( '/' + strPath + '/register-organisation/check', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/register-organisation/check',  { data: req.session.data} );

});


router.get( '/' + strPath + '/manage-organisation/organisation-address', function(req, res) {

	var showConfirm = false;

	if ( req.session.data.addNew == "true" ) {
		req.session.data.addNew = "false";
		showConfirm = true;
	}

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/manage-organisation/organisation-address',  { data: req.session.data, showConfirm: showConfirm } );

});


let getDummyAddresses = function ( req, res ) {

	var addresses = [];
	var addressNo = addresses.length + 1;
	var address = '102 Petty France, London, SW1H 9AJ';

	addresses.push({'addressNo': addressNo, 'address': address, 'addressDX': '152380', 'addressDXExchange': 'Westminster 8' });

	var addressNo = addresses.length + 1;
	var address = '46 High Street, Guildford, GU1 1AH';

	addresses.push({'addressNo': addressNo, 'address': address, 'addressDX': '165731', 'addressDXExchange': 'Guildford 14' });

	req.session.data.addresses = addresses;

	return addresses;

}

module.exports = router;