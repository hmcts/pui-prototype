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

function getCaseNavObject(caseId) {
	var c = caseEngine.getCase(caseId);

	switch(c.type) {
		case 'Continuous online resolution':
			return {
				id: caseId,
				parties: true,
				questions: true,
				directions: true
			}
		case 'Divorce':
			return {
				id: caseId
			}
	}
}

function getCaseBarObject(caseId) {
	return {
		parties: getPartiesLine(caseId),
		id: caseId
	};
}

function getPartiesLine(caseId) {
	return caseEngine.getCase(caseId).parties.map(function(party) {

		if(party.org) {
			return party.org;
		} else {
			return party.firstName + ' ' + party.lastName
		}
	}).join(' vs ')
}

router.use(function(req, res, next) {
	res.locals.user = req.session.user;
	next();
});

router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

router.get('/v1', function(req, res) {
	req.session.destroy();
	res.render('v1/index');
});

router.post('/v1', function(req, res) {
	req.session.user = userEngine.getUser(parseInt(req.body.user, 10))
	res.redirect('/v1/dashboard');
});

router.get('/v1/dashboard', function(req, res) {
	var caseList = caseEngine
		.getCases()
		.filter(function(c) {
			return c.userID == req.session.user.id;
		})
		.map(function(c) {
			var cells = [];

			cells.push({
				html : '<a href="/v1/case/' + c.id + '">'+ c.id +'</a>' + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '')
			});

			cells.push({ html: getPartiesLine(c.id)	});
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
				html : '<a href="/v1/case/' + c.id + '">'+ c.id +'</a>' + (req.session.new ? ' <span class="jui-status  jui-status--new  govuk-!-ml-r1">New</span> ' : '')
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

	res.render('v1/dashboard/index', pageObject);

	req.session.new = false;
	req.session.success = false;
});


router.post('/v1/get-new-case', function (req, res) {

	req.session.success = true;

	var newCases = caseEngine
	.getCases()
	.filter(function(c) {
		return c.userID == req.session.userID;
	});

	newCases = newCases.slice(newCases.length-3, newCases.length-1);

	req.session.newCases = newCases;
	req.session.new = true;

	res.redirect('/v1/dashboard');

});

function viewDivorceCaseSummary(req, res) {
	var c = caseEngine.getCase(req.params.id);

	var pageObject = {
		casebar: getCaseBarObject(c.id),
		casenav: getCaseNavObject(c.id),
		detailsRows: [],
		representativesRows: []
	};

	pageObject.detailsRows.push([
		{ html: 'Case number' },
		{ html: c.id + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '') }
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

	pageObject.representativesRows.push([
		{ html: 'Petitioner' },
		{ html: c.petitioner ? c.petitioner : 'Unrepresented' }
	]);

	pageObject.representativesRows.push([
		{ html: 'Respondent' },
		{ html: c.respondent ? c.respondent : 'Unrepresented' }
	]);

	res.render('v1/case/divorce/summary', pageObject);
}

function viewCorCaseSummary(req, res) {
	var c = caseEngine.getCase(req.params.id);

	var pageObject = {
		success: req.session.success,
		casebar: getCaseBarObject(c.id),
		casenav: getCaseNavObject(c.id),
		detailsRows: [],
		panelRows: []
	};

	pageObject.detailsRows.push([{ html: 'Parties' }, {html: getPartiesLine(c.id)}]);
	pageObject.detailsRows.push([{ html: 'Case number' }, {html: c.id}]);
	pageObject.detailsRows.push([{ html: 'Case type' }, {html: c.benefit}]);
	pageObject.detailsRows.push([{ html: 'Tribunal centre' }, {html: c.tribunalCentre}]);
	pageObject.detailsRows.push([{ html: 'Additional requirements' }, {html: c.requirements}]);

	res.render('v1/case/cor/summary', pageObject);
}

router.get('/v1/case/:id', function(req, res) {
	var c = caseEngine.getCase(req.params.id);

	switch(c.type) {
		case 'Divorce':
			viewDivorceCaseSummary(req, res);
			break;
		case 'Continuous online resolution':
			viewCorCaseSummary(req, res);
			break;
		default:
			res.redirect('/');
	}

});

router.get('/v1/case/:id/parties', function(req, res) {
	var pageObject = {
		casebar: getCaseBarObject(req.params.id),
		casenav: getCaseNavObject(req.params.id)
	};
	res.render('v1/case/parties', pageObject);
});

router.get('/v1/case/:id/casefile', function(req, res) {
	var pageObject = {
		casebar: getCaseBarObject(req.params.id),
		casenav: getCaseNavObject(req.params.id)
	};
	res.render('v1/case/casefile', pageObject);
});


router.get('/v1/case/:id/timeline', function(req, res) {
	var pageObject = {
		casebar: getCaseBarObject(req.params.id),
		casenav: getCaseNavObject(req.params.id)
	};
	res.render('v1/case/timeline', pageObject);
});

router.get('/v1/case/:id/make-decision', function(req, res) {
	var pageObject = {
		casebar: getCaseBarObject(req.params.id),
		casenav: getCaseNavObject(req.params.id)
	};
	res.render('v1/case/make-decision', pageObject);
});

router.post('/v1/case/:id/make-decision', function(req, res) {
	if (req.param('satisifed') == 'no') {
		res.redirect('provide-reason');
	} else {
		res.redirect('costs-order');
	}
});

router.get('/v1/case/:id/provide-reason', function(req, res) {
	var pageObject = {
		casebar: getCaseBarObject(req.params.id),
		casenav: getCaseNavObject(req.params.id)
	};
	res.render('v1/case/provide-reason', pageObject);
});

router.get('/v1/case/:id/costs-order', function(req, res) {
	var pageObject = {
		casebar: getCaseBarObject(req.params.id),
		casenav: getCaseNavObject(req.params.id)
	};
	res.render('v1/case/costs-order', pageObject);
});

module.exports = router;