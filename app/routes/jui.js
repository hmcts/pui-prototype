var express = require('express');
var router  = express.Router();

const caseTypes = require('../data/case-types');
const helpers = require('./helpers');

router.use(function(req, res, next) {
	if(!req.session.cases) {
		req.session.cases = require('../data/cases');
	}
	next();
});

router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

router.get('/setup', function(req, res) {
	req.session.destroy();
	var pageObject = {};
	pageObject.services = Object.keys(caseTypes).map(key => ({
		value: caseTypes[key].id,
		text: caseTypes[key].label,
		checked: true
	}));
	res.render('setup', pageObject);
});

router.post('/setup', function(req, res) {
	// store service lines
	req.session.services = req.body.services;
	req.flash('success', 'prototype setup');
	res.redirect('/app/dashboard');
});

router.get('/app/dashboard', function(req, res) {
	var caseList = req.session.cases
		.filter(c => req.session.services.map(service => parseInt(service, 10)).indexOf(c.typeId) > -1)
		.map(function(c) {

			var cells = [];

			cells.push({
				html : '<a href="/app/case/' + c.id + '">'+ c.id + '</a>' + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '')
			});

			cells.push({ html: helpers.getPartiesLine(c)	});
			cells.push({ html: c.type });
			cells.push({ html: c.status });
			cells.push({ html: c.applicationDate });
			cells.push({ html: c.documents });
			cells.push({ html: c.lastAction });

			return cells;

		});


	var successFlash = req.flash('success')[0];

	if(successFlash == 'cases added') {

		var newCases = req.session.cases
			.map(function(c) {

			var cells = [];

			cells.push({
				html : '<a href="/app/case/' + c.id + '">'+ c.id +'</a>' + ' <span class="jui-status  jui-status--new  govuk-!-ml-r1">New</span>'
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
		caseList: caseList
	};

	switch(successFlash) {
		case 'prototype setup':
			pageObject.success = 'Prototype setup';
			break;
		case 'cases added':
			pageObject.success = 'Cases added';
			break;
	}
	res.render('app/dashboard/index', pageObject);
});

router.post('/app/get-new-case', function (req, res) {
	req.flash('success', 'cases added');
	res.redirect('/app/dashboard');
});

router.get('/app/case/:id', function(req, res) {
	var _case = req.session.cases.filter(c => c.id == req.params.id)[0];

	switch(_case.type) {
		case 'Divorce':
			require('./actions/divorce').viewCaseSummary(req, res);
			break;
		case 'Financial Remedy':
			require('./actions/financial-remedy').viewCaseSummary(req, res);
			break;
		case 'SSCS':
			require('./actions/sscs').viewCaseSummary(req, res);
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

router.get('/app/case/:id/parties', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case)
	};
	res.render('app/case/parties', pageObject);
});

router.get('/app/case/:id/casefile', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case)
	};
	res.render('app/case/casefile', pageObject);
});

router.get('/app/case/:id/casefile/b', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case)
	};
	res.render('app/case/casefileB.html', pageObject);
});

router.get('/app/case/:id/timeline', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case)
	};
	res.render('app/case/timeline', pageObject);
});




// Questions
router.get('/app/case/:id/questions', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		createQuestionsLink: {
			href: '/app/case/' + req.params.id + '/questions/create-questions'
		}
	};
	res.render('app/case/sscs/questions/index', pageObject);
});


router.get('/app/case/:id/questions/create-questions', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case)
	};
	res.render('app/case/sscs/questions/create-questions.html', pageObject);
});



router.get('/app/case/:id/directions', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		createDirectionLink: {
			href: '/app/case/' + req.params.id + '/directions/create-direction'
		},
		createDirectionOrderLink: {
			href: '/app/case/' + req.params.id + '/directions/create-direction-order'
		}
	};
	res.render('app/case/directions/index', pageObject);
});

router.get('/app/case/:id/directions/create-direction', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseId: _case.id
	};
	res.render('app/case/directions/create-direction', pageObject);
});

// Divorce service specific
router.get('/app/case/:id/make-decision', function(req, res) {
	var _case = req.session.cases.filter(c => c.id == req.params.id)[0];

	switch(_case.type) {
		case 'Divorce':
			require('./actions/divorce').viewMakeDecision(req, res);
			break;
		case 'SSCS':
			require('./actions/sscs').viewMakeDecision(req, res);
			break;
		default:
			res.redirect('/');
	}
});

router.post('/app/case/:id/make-decision', function(req, res) {

	if (req.body.satisfied === 'no') {
		res.redirect('provide-reason');
	} else {
		res.redirect('costs-order');
	}

});


// No option route
router.get('/app/case/:id/provide-reason', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/divorce/provide-reason', pageObject);
});


router.post('/app/case/:id/provide-reason', function(req, res) {
	res.redirect('generate-order');
});


router.get('/app/case/:id/generate-order', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/divorce/generate-order', pageObject);
});

router.post('/app/case/:id/generate-order', function(req, res) {
	res.redirect('confirmation');
});


// Yes option route
router.get('/app/case/:id/costs-order', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/divorce/costs-order', pageObject);
});

router.post('/app/case/:id/costs-order', function(req, res) {
	res.redirect('confirmation');
});


router.get('/app/case/:id/check-your-answers', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case)
	};
	res.render('app/case/divorce/check-your-answers', pageObject);
});


router.get('/app/case/:id/confirmation', function(req, res) {
	var pageObject = {
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/divorce/confirmation', pageObject);
});


module.exports = router;