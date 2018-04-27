var express = require('express');
var router  = express.Router();

var userEngine = require('../models/users');
var caseEngine = require('../models/cases');


function getCaseObject(id) {

	var c = caseEngine.getCase(id);

	var caseBarObject = {
		parties: c.parties.map(function(party) {
			return party.firstName + ' ' + party.lastName;
		}).join(' vs '),
		id: c.id
	};

	return caseBarObject;

}


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

router.post('/divorce/v1/get-new-case', function (req, res) {
	req.session.success = true;

	var newCases = caseEngine
		.getCases()
		.filter(function(c) {
			return c.userID == req.session.userID;
		})

	newCases = newCases.slice(newCases.length-3, newCases.length-1);

	req.session.newCases = newCases;
	req.session.new = true;

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
				html : '<a href="/divorce/v1/case/' + c.id + '">'+ c.id +'</a>' + (c.urgent ? ' <span class="jui-status  jui-status--urgent">Urgent</span> ' : '')
			});

			cells.push({ html: c.parties.map(function(party) {
					return party.firstName + ' ' + party.lastName;
				}).join(' vs ')
			});

			cells.push({ html: c.type });
			cells.push({ html: c.status });
			cells.push({ html: c.applicationDate	});
			cells.push({ html: c.documents });
			cells.push({ html: c.lastAction });
			return cells;
		});

	if(req.session.newCases) {
		var newCases = req.session.newCases
		.map(function(c) {
			var cells = [];

			cells.push({
				html : '<a href="/divorce/v1/case/' + c.id + '">'+ c.id +'</a>' + (req.session.new ? ' <span class="jui-status jui-status--new">New</span> ' : '')
			});

			cells.push({ html: c.parties.map(function(party) {
					return party.firstName + ' ' + party.lastName;
				}).join(' vs ')
			});

			cells.push({ html: c.type });
			cells.push({ html: c.status });
			cells.push({ html: c.applicationDate	});
			cells.push({ html: c.documents });
			cells.push({ html: c.lastAction });
			return cells;
		});

		Array.prototype.injectArray = function( idx, arr ) {
				return this.slice( 0, idx ).concat( arr ).concat( this.slice( idx ) );
		};

		caseList = caseList.injectArray(1, newCases);
	}

		var pageObject = {
			caseList: caseList,
			success: req.session.success
		};

		res.render('divorce/v1/dashboard/index', pageObject);

		req.session.new = false;
		req.session.success = false;

});


router.get('/divorce/v1/case/:id', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id),
		casebar: getCaseObject(req.params.id),
		detailsRows: [],
		representativesRows: []
	};

	var c = caseEngine.getCase(req.params.id);

	// Case details
	pageObject.detailsRows.push([
		{ html: 'Case number' },
		{ html: c.id }
	]);

	pageObject.detailsRows.push([
		{ html: 'Case type' },
		{ html: c.type }
	]);

	pageObject.detailsRows.push([
		{ html: 'Case status' },
		{ html: c.status }
	]);

	pageObject.detailsRows.push([
		{ html: 'Reason for divorce' },
		{ html: c.reason }
	]);

	// Representatives
	pageObject.representativesRows.push([
		{ html: 'Petitioner' },
		{ html: c.petitioner ? c.petitioner : 'Unrepresented' }
	]);

	pageObject.representativesRows.push([
		{ html: 'Respondent' },
		{ html: c.respondent ? c.respondent : 'Unrepresented' }
	]);

	res.render('divorce/v1/case/index', pageObject);

});


router.get('/divorce/v1/case/:id/casefile', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id),
		casebar: getCaseObject(req.params.id),
	};

	res.render('divorce/v1/case/casefile', pageObject);

});


router.get('/divorce/v1/case/:id/timeline', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id),
		casebar: getCaseObject(req.params.id),
	};

	res.render('divorce/v1/case/timeline', pageObject);

});


router.get('/divorce/v1/case/:id/make-decision', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id),
		casebar: getCaseObject(req.params.id),
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
		'case': caseEngine.getCase(req.params.id),
		casebar: getCaseObject(req.params.id),
	};

	res.render('divorce/v1/case/provide-reason', pageObject);

});


router.get('/divorce/v1/case/:id/costs-order', function(req, res) {

	var pageObject = {
		'case': caseEngine.getCase(req.params.id),
		casebar: getCaseObject(req.params.id),
	};

	res.render('divorce/v1/case/costs-order', pageObject);

});


router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/divorce/v1');
});

module.exports = router;