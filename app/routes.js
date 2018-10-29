var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
	res.render('index.html');
});

router.get('/sign-out', function (req, res) {
	req.session.destroy();
	res.redirect('/app/sign-in');
});

router.post('/apply/sra-number', (req, res) => {
	if(req.body['sra-number-q'] === 'yes') {
		res.redirect('/apply/sra-number-2');
	} else {
		res.redirect('/apply/not-sure');
	}
});


router.post('/apply/sra-number-3', (req, res) => {
	req.session.data['org-name'] = 'Sherwin Davis';
	req.session.data['org-number'] = '123456';
	req.session.data['org-address'] = '31 High Street<br> Norwich<br> NR2 8GG';
	res.redirect('/apply/name')
});

router.post('/manage-case/find-case', (req, res) => {
	var casenumber = req.body['case-number'].replace(/-/g, "").trim();

	if(casenumber === '1001221133446772' || casenumber === 'john') {
		res.redirect('/manage-case/case-1');
	} else {
		res.redirect('/manage-case/no-access');
	}
});

router.post('/create-case/fr/3', (req, res) => {
	if(req.body.represented == 'yes') {
		res.redirect('/create-case/fr/4a');
	} else {
		res.redirect('/create-case/fr/4b');
	}
});

router.post('/create-account-v2/organisation-address-another', (req, res) => {
	if(!req.session.data.addresses) {
		req.session.data.addresses = [];
	}

	var address = {
		line1: req.session.data['address-line-1'],
		town: req.session.data['address-town'],
		postcode: req.session.data['address-postcode'],
		dx: req.session.data['org-dx']
	};

	req.session.data.addresses.push(address);

	if(req.body['another-address'] === 'yes') {
		res.redirect('/create-account-v2/organisation-address-postcode');
	} else {
		res.redirect('/create-account-v2/name');
	}
});

router.get('/create-account-v2/check', (req, res) => {
	res.render('create-account-v2/check.html');
});

router.post('/create-account-v2/organisation-address-postcode-results', (req, res) => {
	req.session.data['address-town'] = 'London';
	res.redirect('/create-account-v2/organisation-dx');
});

router.get('/manage-account-v2/users', (req, res) => {
	var emailaddresses = req.session.data.emailaddresses;

	if(emailaddresses) {
		if(emailaddresses.indexOf(',') >= 0) {
			emailaddresses = emailaddresses.split(',');
		} else {
			emailaddresses = [emailaddresses];
		}
	}

	var permissions = req.session.data.permissions;


	var rows = [
		[
			{
				html: '<a href="">adam@sherwindavis.co.uk</a>'
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Active"
			}
		],
		[
			{
				html: '<a href="">amysmith@sherwindavis.co.uk</a>'
			},
			{
				text: ""
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: ""
			},
			{
				text: "Pending"
			}
		],[
			{
				html: '<a href="">djones@sherwindavis.co.uk</a>'
			},
			{
				text: ""
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: ""
			},
			{
				text: "Active"
			}
		],
		[
			{
				html: '<a href="">spotts@sherwindavis.co.uk</a>'
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: "Yes"
			},
			{
				text: "Active"
			}
		],
		[
			{
				html: '<a href="/">kmiles@sherwindavis.co.uk</a>'
			},
			{
				text: "Yes"
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: "Active"
			}
		]
	];

	var newRows = [

	];


	if(emailaddresses) {
		for(var i = 0; i < emailaddresses.length; i++) {
			newRows.push([{
				html: `<a href="/">${emailaddresses[i]}</a>`
			},
			{
				text: permissions.indexOf('cases') > -1 ? "Yes" : ""
			},
			{
				text: permissions.indexOf('organisation') > -1 ? "Yes" : ""
			},
			{
				text: permissions.indexOf('users') > -1 ? "Yes" : ""
			},
			{
				text: permissions.indexOf('payment') > -1 ? "Yes" : ""
			},
			{
				text: "Pending"
			}])
		}

		rows = newRows.concat(rows);
	}


	res.render('manage-account-v2/users/index.html', {
		rows: rows
	});
});

router.post('/create-account-v3/organisation-address-another', (req, res) => {
	if(!req.session.data.addresses) {
		req.session.data.addresses = [];
	}

	var address = {
		line1: req.session.data['address-line-1'],
		town: req.session.data['address-town'],
		postcode: req.session.data['address-postcode'],
		dx: req.session.data['org-dx']
	};

	req.session.data.addresses.push(address);

	if(req.body['another-address'] === 'yes') {
		res.redirect('/create-account-v3/organisation-address-postcode');
	} else {
		res.redirect('/create-account-v3/name');
	}
});

router.get('/create-account-v3/check', (req, res) => {
	res.render('create-account-v3/check.html');
});

router.post('/create-account-v3/organisation-address-postcode-results', (req, res) => {
	req.session.data['address-town'] = 'London';
	res.redirect('/create-account-v3/organisation-dx');
});

router.get('/manage-account-v3/users', (req, res) => {
	var emailaddress = req.session.data.emailaddress;

	var permissions = req.session.data.permissions || [];


	var rows = [
		[
			{
				html: '<a href="">adam@sherwindavis.co.uk</a>'
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Active"
			}
		],
		[
			{
				html: '<a href="">amysmith@sherwindavis.co.uk</a>'
			},
			{
				text: ""
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: ""
			},
			{
				text: "Pending"
			}
		],[
			{
				html: '<a href="">djones@sherwindavis.co.uk</a>'
			},
			{
				text: ""
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: ""
			},
			{
				text: "Active"
			}
		],
		[
			{
				html: '<a href="">spotts@sherwindavis.co.uk</a>'
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: "Yes"
			},
			{
				text: "Active"
			}
		],
		[
			{
				html: '<a href="/">kmiles@sherwindavis.co.uk</a>'
			},
			{
				text: "Yes"
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: "Active"
			}
		]
	];

	var newRows = [

	];

	rows.push([{
		html: `<a href="/">${emailaddress}</a>`
	},
	{
		text: permissions.indexOf('cases') > -1 ? "Yes" : ""
	},
	{
		text: permissions.indexOf('organisation') > -1 ? "Yes" : ""
	},
	{
		text: permissions.indexOf('users') > -1 ? "Yes" : ""
	},
	{
		text: permissions.indexOf('payment') > -1 ? "Yes" : ""
	},
	{
		text: "Pending"
	}]);

	res.render('manage-account-v3/users/index.html', {
		rows: rows
	});
});

router.get('/manage-account-v4/users', (req, res) => {
	var emailaddress = req.session.data.emailaddress;

	var permissions = req.session.data.permissions || [];


	var rows = [
		[
			{
				html: 'holly.whitwham@westberks.gov.uk'
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Active"
			}
		],
		// [
		// 	{
		// 		html: '<a href="">adam@sherwindavis.co.uk</a>'
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: "Active"
		// 	}
		// ],
		// [
		// 	{
		// 		html: '<a href="">amysmith@sherwindavis.co.uk</a>'
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: "Pending"
		// 	}
		// ],[
		// 	{
		// 		html: '<a href="">djones@sherwindavis.co.uk</a>'
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: "Active"
		// 	}
		// ],
		// [
		// 	{
		// 		html: '<a href="">spotts@sherwindavis.co.uk</a>'
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: "Active"
		// 	}
		// ],
		// [
		// 	{
		// 		html: '<a href="/">kmiles@sherwindavis.co.uk</a>'
		// 	},
		// 	{
		// 		text: "Yes"
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: ""
		// 	},
		// 	{
		// 		text: "Active"
		// 	}
		// ]
	];

	var newRows = [

	];

	if(emailaddress) {
		rows.push([{
			html: `${emailaddress}`
		},
		{
			text: permissions.indexOf('cases') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('organisation') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('users') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('payment') > -1 ? "Yes" : ""
		},
		{
			text: "Pending"
		}]);
	}



	res.render('manage-account-v4/users/index.html', {
		rows: rows
	});
});

router.get('/manage-account-v5/users', (req, res) => {
	var emailaddress = req.session.data.emailaddress;

	var permissions = req.session.data.permissions || [];


	var rows = [
		[
			{
				html: 'holly.whitwham@westberks.gov.uk'
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "Active"
			}
		],
	];

	var newRows = [

	];

	if(emailaddress) {
		rows.push([{
			html: `${emailaddress}`
		},
		{
			text: permissions.indexOf('cases') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('organisation') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('users') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('payment') > -1 ? "Yes" : ""
		},
		{
			text: "Pending"
		}]);
	}



	res.render('manage-account-v5/users/index.html', {
		rows: rows
	});
});

module.exports = router;