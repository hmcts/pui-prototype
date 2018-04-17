const express = require('express');
const router  = express.Router();


const userEngine = require('../models/users');
const caseEngine = require('../models/cases');


router.get('/divorce', function (req, res) {
	res.render('divorce/index', {
		users: userEngine.getUsersEntries()
	});
});


router.get('/divorce/load-user/:id/', function(req, res) {
	req.session.userID = req.params.id;
	res.redirect('/divorce/dashboard');
});


router.get('/divorce/dashboard', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCases();

	res.render('divorce/dashboard/index', {
		user: user,
		cases: caseEngine.getCases().filter(function(c) {
			return c.userID == req.session.userID;
		})
	});

});


router.get('/divorce/case/:id', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCasesEntry(req.params.id);

	res.render('divorce/case/index', {
		user: user,
		cases: cases
	});

});


module.exports = router;