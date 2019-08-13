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
				html: '<a href="/mvp-4/manage-organisation/users/view-revoked">Amy Venkatanarasimharaj</a>'
			},
			{
				text: 'amyvenkatanarasimharaj@wedlakebell.com'
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
				text: "Suspended"
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
			text: permissions.indexOf('cases') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('organisation') > -1 ? "Yes" : ""
		},
		{
			text: permissions.indexOf('users') > -1 ? "Yes" : ""
		},
	
		{
			text: 'Pending'
		}]);
	}



	res.render('mvp-4/manage-organisation/users/index.html', {
		rows: rows
	});
});

module.exports = router;