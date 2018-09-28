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
				html: '<a href="">amysmith@sherwindavis.co.uk</a>'
			},
			{
				text: "No"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "No"
			},
			{
				text: "Pending"
			}
		],[
			{
				html: '<a href="">djones@sherwindavis.co.uk</a>'
			},
			{
				text: "No"
			},
			{
				text: "Yes"
			},
			{
				text: "Yes"
			},
			{
				text: "No"
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
				text: "No"
			},
			{
				text: "No"
			},
			{
				text: "No"
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
				text: "No"
			},
			{
				text: "No"
			},
			{
				text: "No"
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
				text: permissions.indexOf('cases') > -1 ? "Yes" : "No"
			},
			{
				text: permissions.indexOf('organisation') > -1 ? "Yes" : "No"
			},
			{
				text: permissions.indexOf('users') > -1 ? "Yes" : "No"
			},
			{
				text: permissions.indexOf('payment') > -1 ? "Yes" : "No"
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



module.exports = router;