const express = require('express');
const router  = express.Router();


const userEngine = require('../models/users');
const caseEngine = require('../models/cases');

// Prototype setup

router.get('/cor/v1', function (req, res) {
	res.render('cor/v1/index', {
		users: userEngine.getUsersEntries()
	});
});

router.get('/cor/load-user/:id/', function(req, res) {
	req.session.userID = req.params.id;
	res.redirect('/cor/v1/dashboard');
});

// Application routes

router.post('/cor/v1/get-new-case', function (req, res) {
	req.session.success = true;
	res.redirect('/cor/v1/case');
});

router.get('/cor/v1/case', function (req, res) {
	res.render('cor/v1/case/index', { success: req.session.success });
	req.session.success = null;
});

module.exports = router;