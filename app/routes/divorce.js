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
	req.session.userID = req.param('user');
	res.redirect('/divorce/v1/dashboard');
});


router.get('/divorce/v1/dashboard', function(req, res) {

	var user = userEngine.getUsersEntry(req.session.userID);

	var caseList = caseEngine
		.getCases()
		.filter(function(c) {
			return c.userID == req.session.userID;
		})
		.map(function(c) {
			var cells = [];
			cells.push({
				html : '<a href="/divorce/v1/case/' + c.id + '">'+ c.id +'</a>'
			});
			cells.push({ html : c.parties });
			cells.push({ html : c.type });
			cells.push({ html : c.status });
			cells.push({ html : c.applicationDate	});
			cells.push({ html : c.documents });
			cells.push({ html : c.lastAction });
			cells.push({ html : (c.urgent ? ' <span class="jui-status  jui-status--urgent">Urgent</span>' : '') });
			return cells;
		});

		var pageObject = {
			caseList: caseList
		};

		res.render('divorce/v1/dashboard/index', pageObject);

});


router.get('/divorce/v1/case/:id', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id),
		detailsRows: [],
		representativesRows: []
	};

	// Case details
	pageObject.detailsRows.push([
		{ html: 'Case number' }, 
		{ html: pageObject.case.number }
	]);

	pageObject.detailsRows.push([
		{ html: 'Case type' }, 
		{ html: pageObject.case.type }
	]);

	pageObject.detailsRows.push([
		{ html: 'Case status' }, 
		{ html: pageObject.case.status }
	]);

	pageObject.detailsRows.push([
		{ html: 'Reason for divorce' }, 
		{ html: pageObject.case.reason }
	]);

	// Representatives
	pageObject.representativesRows.push([
		{ html: 'Petitioner' }, 
		{ html: pageObject.case.petitioner ? pageObject.case.petitioner : 'Unrepresented' }
	]);

	pageObject.representativesRows.push([
		{ html: 'Respondent' }, 
		{ html: pageObject.case.respondent ? pageObject.case.respondent : 'Unrepresented' }
	]);

	res.render('divorce/v1/case/index', pageObject);

});


router.get('/divorce/v1/case/:id/casefile', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id)
	};

	res.render('divorce/v1/case/casefile', pageObject);

});


router.get('/divorce/v1/case/:id/timeline', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id)
	};

	res.render('divorce/v1/case/timeline', pageObject);

});


router.get('/divorce/v1/case/:id/make-decision', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id)
	};

	res.render('divorce/v1/case/make-decision', pageObject);

});


router.post('/divorce/v1/case/:id/make-decision', function(req, res) {

	if (req.param('satisifed') == 'no') {
		res.redirect('provide-reason');
	} else {
		res.redirect('costs-order');
	}
	
});


router.get('/divorce/v1/case/:id/provide-reason', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id)
	};

	res.render('divorce/v1/case/provide-reason', pageObject);

});


router.get('/divorce/v1/case/:id/costs-order', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id)
	};

	res.render('divorce/v1/case/costs-order', pageObject);

});


router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/divorce/v1');
});


module.exports = router;