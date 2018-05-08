var express = require('express');
var router  = express.Router();

var userEngine = require('../models/users');
var caseEngine = require('../models/cases');

var helpers = require('./helpers');


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
	req.session.user = userEngine.getUser(parseInt(req.body.user, 10));
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
				html : '<a href="/v1/case/' + c.id + '">'+ c.id + '</a>' + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '')
			});

			cells.push({ html: helpers.getPartiesLine(c.id)	});
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
			cells.push({ html: c.applicationDate });
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


router.get('/v1/case/:id', function(req, res) {

	var c = caseEngine.getCase(req.params.id);

	switch(c.type) {

		case 'Divorce':
			require('./actions/divorce').viewCaseSummary(req, res);
			break;

		case 'Financial Remedy':
			require('./actions/financial-remedy').viewCaseSummary(req, res);
			break;

		case 'Continuous Online Resolution':
			require('./actions/continuous-online-resolution').viewCaseSummary(req, res);
			break;

		case 'Civil Money Claims':
			require('./actions/civil-money-claims').viewCaseSummary(req, res);
			break;

		case 'Public Law':
			require('./actions/public-law').viewCaseSummary(req, res);
			break;

		default:
			res.redirect('/');

	}

});


router.get('/v1/case/:id/parties', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('v1/case/parties', pageObject);
});


router.get('/v1/case/:id/casefile', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('v1/case/casefile', pageObject);
});


router.get('/v1/case/:id/timeline', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('v1/case/timeline', pageObject);
});


router.get('/v1/case/:id/directions', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id),
		createDirectionLink: {
			href: '/v1/case/' + req.params.id + '/directions/create-direction'
		},
		createDirectionOrderLink: {
			href: '/v1/case/' + req.params.id + '/directions/create-direction-order'
		}
	};
	res.render('v1/case/continuous-online-resolution/directions/index', pageObject);
});


router.get('/v1/case/:id/make-decision', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
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
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('v1/case/provide-reason', pageObject);
});


router.get('/v1/case/:id/costs-order', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('v1/case/costs-order', pageObject);
});


router.get('/v1/case/:id/confirmation', function(req, res) {
	var pageObject = {
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('v1/case/confirmation', pageObject);
});


module.exports = router;