var express = require('express');
var router = express.Router();

router.get('/mvp-4/manage-organisation/users', (req, res) => {
	var emailaddress = req.session.data.emailaddress;

	var permissions = req.session.data.permissions || [];

	var rows = [
		[

		{
				html: '<a href="/mvp-4/manage-organisation/users/view">Peter Gold</a>'
			},
			{
				text: 'peter.gold@wedlakebell.com'
			},
	

			{
				text: "Active"
			}
		],
		[
		{
				html: '<a href="/mvp-4/manage-organisation/users/view-pending">Amy Venkatanarasimharaj</a>'
			},
			{
				text: 'amyvenkatanarasimharaj@wedlakebell.com'
			},

			{
				text: "Pending"
			}
		],
	];

	var newRows = [

	];


	if(emailaddress) {
		rows.push([

{
	html:'<a href="">First Name Last Name</a>'
},

		{
			text: `${emailaddress}`
		},
	
		{
			text: 'Pending'
		}]);
	}



	res.render('mvp-4/manage-organisation/users/index.html', {
		rows: rows
	});
});

router.get('/oct-2020/manage-organisation/users', (req, res) => {
	var emailaddress = req.session.data.emailaddress;

	var permissions = req.session.data.permissions || [];

	var fullName = 'Peter Gold';

	if ( req.session.data.firstname ) {
		fullName = req.session.data.firstname + ' ' + req.session.data.lastname
	}

	var rows = [
		[

			{
				html: '<a href="/oct-2020/manage-organisation/users/view">' + fullName + '</a>'
			},
			{
				text: req.session.data['email-address'] || 'peter.gold@wedlakebell.com'
			},
	

			{
				text: "Active"
			}
		],
		[

			{
				html: '<a href="/oct-2020/manage-organisation/users/view2">Joe Bloggs</a>'
			},
			{
				text: 'joe@bloggs.com'
			},
	

			{
				text: "Active"
			}
		]
	];

	var newRows = [

	];


	if(emailaddress) {
		rows.push([

{
	html:'<a href="">Firstname Lastname</a>'
},

		{
			text: `${emailaddress}`
		},
	
		{
			text: 'Pending'
		}]);
	}



	res.render('oct-2020/manage-organisation/users/index.html', {
		rows: rows
	});
});

module.exports = router;