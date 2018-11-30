var express = require('express');
var router = express.Router();

router.get('/mvp/manage-organisation/users', (req, res) => {
	var emailaddress = req.session.data.emailaddress;

	var permissions = req.session.data.permissions || [];


	var rows = [
		[
			{
				html: 'holly.whitwham@westberks.gov.uk'
			},
			{
				text: "All"
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
			text: permissions.indexOf('cases') > -1 ? "All" : ""
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



	res.render('mvp/manage-organisation/users/index.html', {
		rows: rows
	});
});

module.exports = router;