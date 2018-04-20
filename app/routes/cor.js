const express = require('express');
const router  = express.Router();


const userEngine = require('../models/users');
const caseEngine = require('../models/cases');


router.get('/cor/v1', function (req, res) {
	res.render('cor/v1/index', {
		users: userEngine.getUsersEntries()
	});
});


router.get('/cor/load-user/:id/', function(req, res) {
	req.session.userID = req.params.id;
	res.redirect('/cor/v1/dashboard');
});


router.post('/cor/v1/get-new-case', function (req, res) {
	req.session.success = true;
	res.redirect('/cor/v1/case');
});


module.exports = router;