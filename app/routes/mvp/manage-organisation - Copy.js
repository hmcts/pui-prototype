var express = require('express');
var router = express.Router();

router.get('/mvp-4/manage-organisation/users', (req, res) => {
	var emailaddress = req.session.data.emailaddress;

	var permissions = req.session.data.permissions || [];


	var rows = [
		[
			{
				html: 'adam.silver@wedlakebell.com'
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



	res.render('mvp-4/manage-organisation/users/index.html', {
		rows: rows
	});
});

module.exports = router;