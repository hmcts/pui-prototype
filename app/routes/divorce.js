const express = require('express');
const router  = express.Router();


const userEngine = require('../models/users');
const caseEngine = require('../models/cases');


router.use(function(req, res, next) {
	res.locals.user = req.session.userID;
	next();
});


router.get('/divorce/v1', function(req, res) {
	req.session.destroy();
	res.render('divorce/v1/index');
});


router.post('/divorce/v1', function(req, res) {
	req.session.userID = req.param('user'); // Store post value into session
	res.redirect('/divorce/v1/dashboard');
});


router.get('/divorce/v1/dashboard', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCases();

	res.render('divorce/v1/dashboard/index', {
		user: user,
		cases: caseEngine.getCases().filter(function(c) {
			return c.userID == req.session.userID;
		})
	});

});


router.get('/divorce/v1/case/:id', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCasesEntry(req.params.id);

	res.render('divorce/v1/case/index', {
		user: user,
		cases: cases
	});

});


router.get('/divorce/v1/case/:id/casefile', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCasesEntry(req.params.id);

	res.render('divorce/v1/case/casefile', {
		user: user,
		cases: cases
	});

});


router.get('/divorce/v1/case/:id/timeline', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCasesEntry(req.params.id);

	res.render('divorce/v1/case/timeline', {
		user: user,
		cases: cases
	});

});


router.get('/divorce/v1/case/:id/make-decision', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCasesEntry(req.params.id);

	res.render('divorce/v1/case/make-decision', {
		user: user,
		cases: cases
	});

});


router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/divorce/v1');
});


module.exports = router;