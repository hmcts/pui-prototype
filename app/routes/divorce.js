var express = require('express');
var router  = express.Router();

var userEngine = require('../models/users');
var caseEngine = require('../models/cases');


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


router.post('/divorce/v1/case/:id/make-decision', function(req, res) {

	if (req.param('satisifed') == 'no') {
		res.redirect('provide-reason');
	} else {
		res.redirect('costs-order');
	}
	
});


router.get('/divorce/v1/case/:id/provide-reason', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCasesEntry(req.params.id);

	res.render('divorce/v1/case/provide-reason', {
		user: user,
		cases: cases
	});

});


router.get('/divorce/v1/case/:id/costs-order', function(req, res) {

	var user  = userEngine.getUsersEntry(req.session.userID);
	var cases = caseEngine.getCasesEntry(req.params.id);

	res.render('divorce/v1/case/costs-order', {
		user: user,
		cases: cases
	});

});


router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/divorce/v1');
});


module.exports = router;