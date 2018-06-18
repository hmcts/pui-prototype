var express = require('express');
var router = express.Router();
var types = require('../data/types');
var helpers = require('./helpers');


router.use(function(req, res, next) {
	if(!req.session.cases) {
		req.session.cases = require('../data/cases');
	}
	next();
});


router.get('/signout', (req, res) => {
	req.session.destroy();
	res.redirect('/app/signin');
});


router.get('/app/signin', (req, res) => {
	res.render('signin');
});


router.post('/app/signin', (req, res) => {
	res.redirect('/app/dashboard');
});


router.get('/app', (req, res) => {
	res.redirect('/app/dashboard');
});


router.get('/app/cases', (req, res) => {
	res.redirect('/app/dashboard');
});


router.get('/app/dashboard', (req, res) => {
	var caseList = req.session.cases;

	if(req.session.types) {
		caseList = caseList.filter(c => req.session.types.indexOf(c.typeId) > -1);
	}

	caseList = caseList.map(function(c) {
		var cells = [];

		cells.push({
			html : '<a href="/app/cases/' + c.id + '">'+ c.id + '</a>' + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '')
		});

		cells.push({ html: helpers.getPartiesLine(c)	});
		cells.push({ html: helpers.getCaseTypeLabel(c) });
		cells.push({ html: c.status });
		cells.push({ html: helpers.getFormattedDate(c.applicationDate) + ' at ' + helpers.getFormattedTime(c.applicationDate) });
		cells.push({ html: helpers.getFormattedDate(c.lastAction) + ' at ' + helpers.getFormattedTime(c.lastAction) });

		return cells;

	});

	var pageObject = {
		caseList: caseList
	};

	res.render('app/dashboard/index', pageObject);

});


router.get('/app/cases/:id', (req, res) => {
	var _case = req.session.cases.filter(c => c.id == req.params.id)[0];
	require('./actions/' + helpers.getCaseType(_case).toLowerCase()).viewCaseSummary(req, res);
});


router.get('/app/cases/:id/documents', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	res.redirect(`/app/cases/${req.params.id}/documents/${_case.documents[0].id}`);
});


router.get('/app/cases/:id/documents/:num', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		documents: _case.documents,
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};

	var templatePath = `app/case/${helpers.getCaseType(_case).toLowerCase()}/documents/${req.params.num}`;

	res.render(templatePath, pageObject);
});


module.exports = router;