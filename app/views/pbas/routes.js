var express = require('express');
var router 	= express.Router();
var strPath = 'pbas';

router.post( '/' + strPath + '/register-organisation/organisation-sra-check', (req, res) => {
	if (req.body['sra-number'] === '123456') {
		res.redirect('/' + strPath + '/register-organisation/organisation-sra-error');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-address');
	}
});

router.post( '/' + strPath + '/register-organisation/organisation-address-another-check', (req, res) => {
	
	req.session.data.changeAddress = null;

	if (req.body['add-another'] === 'yes') {
		res.redirect('/' + strPath + '/register-organisation/organisation-address');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-pba');
	}
});


router.post( '/' + strPath + '/register-organisation/remove-address', (req, res) => {

	var addresses = req.session.data.addresses || [];
	var removed = addresses.splice( req.session.data.removeAddress, 1 );
//	delete addresses[ req.session.data.removeAddress ];
	req.session.data.addresses = addresses;

    if ( req.session.data.return == 'manage' ) {
		res.redirect('/' + strPath + '/manage-organisation/organisation-address?showConfirmRemoved=true');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-address-another');
	}

});


router.post( '/' + strPath + '/register-organisation/organisation-address-add', (req, res) => {

	var addresses = req.session.data.addresses || [];
	var addressNo = addresses.length;
	var addressAddress1 = (req.session.data['address_Line1']) ? req.session.data['address_Line1'] : '-'
	var addressAddress2 = (req.session.data['address_Line2']) ? req.session.data['address_Line2'] : ''
	var addressTown = (req.session.data['address_city']) ? req.session.data['address_city'] : ''
	var addressPostcode = (req.session.data['address_Postcode']) ? req.session.data['address_Postcode'] : ''
	var address = addressAddress1 + ', ' + addressAddress2 + ', ' + addressTown + ', ' + addressPostcode;

	var addressDX = (req.session.data['dx-number']) ? req.session.data['dx-number'] : ''
	var addressDXExchange = (req.session.data['dx-exchange']) ? req.session.data['dx-exchange'] : ''

	if ( typeof req.session.data['changeAddress'] !== 'undefined' && req.session.data['changeAddress'] ) {
		addresses[ req.session.data['changeAddress'] ] = {'addressNo': req.session.data['changeAddress'], 'address': address, 'addressDX': addressDX, 'addressDXExchange': addressDXExchange, 'addressPostcode': addressPostcode };
	} else {
		addresses.push({'addressNo': addressNo, 'address': address, 'addressDX': addressDX, 'addressDXExchange': addressDXExchange, 'addressPostcode': addressPostcode });
	}

	req.session.data.addresses = addresses;
	req.session.data.changeAddress = null;

	if ( req.session.data.addNew == "true" ) {
		res.redirect('/' + strPath + '/manage-organisation/organisation-address');
	} else if ( req.session.data.return == 'manage' ) {
		res.redirect('/' + strPath + '/manage-organisation/organisation-address?showConfirmUpdated=true');
	} else {
		res.redirect('/' + strPath + '/register-organisation/organisation-address-another');
	}

});

router.get( '/' + strPath + '/manage-case/searchaddress', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/manage-case/searchaddress/index',  { data: req.session.data} );

});


router.get( '/' + strPath + '/register-organisation/your-office', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/register-organisation/your-office',  { data: req.session.data} );

});


router.get( '/' + strPath + '/register-organisation/check', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/register-organisation/check',  { data: req.session.data} );

});

router.get( '/' + strPath + '/manage-organisation', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/manage-organisation/index',  { data: req.session.data} );

});

router.get( '/' + strPath + '/manage-organisation/no-pbas', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/manage-organisation/no-pbas',  { data: req.session.data} );

});


router.get( '/' + strPath + '/manage-organisation/updated-pba', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/manage-organisation/updated-pba',  { data: req.session.data} );

});


router.get( '/' + strPath + '/manage-organisation/users/view', function(req, res) {

	req.session.data.fullname = 'Peter Gold';

	if ( req.session.data.firstname ) {
		req.session.data.fullname = req.session.data.firstname + " "+ req.session.data.lastname;
	}

  	res.render( strPath + '/manage-organisation/users/view',  { data: req.session.data} );

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

router.get( '/' + strPath + '/manage-organisation/users/new', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/manage-organisation/users/new',  { data: req.session.data } );

});

router.get( '/' + strPath + '/manage-organisation/users/update-location', function(req, res) {

	req.session.data.addresses = req.session.data.addresses || getDummyAddresses( req, res );
  	res.render( strPath + '/manage-organisation/users/update-location',  { data: req.session.data } );

});



router.post( '/' + strPath + '/manage-case/searchaddress', (req, res) => {

console.log( req.session.data );
    if ( req.session.data['serviceAddress'] == 'other' ) {
		res.redirect('/' + strPath + '/manage-case/searchaddress/other-address');
	} else {
		res.redirect('/' + strPath + '/manage-case/searchaddress/respondent');
	}

});

let getDummyAddresses = function ( req, res ) {

	var addresses = [];
	var addressNo = addresses.length + 1;
	var address = '102 Cornhill, London, SW1H 9AJ';

	addresses.push({'addressNo': addressNo, 'address': address, 'addressDX': '152380', 'addressDXExchange': 'Westminster 8', 'addressPostcode': 'SW1H 9AJ' });

	var addressNo = addresses.length + 1;
	var address = '46 High Street, Guildford, GU1 1AH';

	addresses.push({'addressNo': addressNo, 'address': address, 'addressDX': '165731', 'addressDXExchange': 'Guildford 14', 'addressPostcode': 'GU1 1AH' });

	req.session.data.addresses = addresses;

	return addresses;

}

module.exports = router;