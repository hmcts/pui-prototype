var express = require('express');
var router  = express.Router();

var userData = require('../data/users');
var caseTypesData = require('../data/case-types');
var caseData = require('../data/cases');

var helpers = require('./helpers');

router.use(function(req, res, next) {
	if(!req.session.cases) {
		req.session.cases = caseData.getCases();
	}
	next();
});


router.use(function(req, res, next) {
	res.locals.user = req.session.user;
	next();
});


router.get('/signout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});


router.get('/setup', function(req, res) {
	req.session.destroy();
	var pageObject = {};
	pageObject.services = Object.keys(caseTypesData).map(key => ({
		value: caseTypesData[key].id,
		text: caseTypesData[key].label
	}));
	res.render('setup', pageObject);
});

router.post('/setup', function(req, res) {
	// store user
	req.session.user = userData.getUser(parseInt(req.body.role, 10));

	// store service lines
	req.session.services = req.body.services;
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

			cells.push({ html: helpers.getPartiesLine(c.id)	});
			cells.push({ html: c.type });
			cells.push({ html: c.status });
			cells.push({ html: c.applicationDate });
			cells.push({ html: c.documents });
			cells.push({ html: c.lastAction });

			return cells;

		});

	if(req.session.newCases) {

		var newCases = req.session.newCases

		.map(function(c) {

			var cells = [];

			cells.push({
				html : '<a href="/app/case/' + c.id + '">'+ c.id +'</a>' + (req.session.new ? ' <span class="jui-status  jui-status--new  govuk-!-ml-r1">New</span> ' : '')
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

	res.render('app/dashboard/index', pageObject);

	req.session.new = false;
	req.session.success = false;

});


router.post('/app/get-new-case', function (req, res) {

	req.session.success = true;

	var newCases = req.session.cases
	.filter(c => (c.userID == req.session.userID));

	newCases = newCases.slice(newCases.length-3, newCases.length-1);

	req.session.newCases = newCases;
	req.session.new = true;

	res.redirect('/app/dashboard');

});


router.get('/app/case/:id', function(req, res) {

	var c = req.session.cases.filter(c => c.id == req.params.id)[0];

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


router.get('/app/case/:id/parties', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/parties', pageObject);
});


router.get('/app/case/:id/casefile', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/casefile', pageObject);
});


router.get('/app/case/:id/casefile/b', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/casefileB.html', pageObject);
});


router.get('/app/case/:id/timeline', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/timeline', pageObject);
});


router.get('/app/case/:id/directions', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id),
		createDirectionLink: {
			href: '/app/case/' + req.params.id + '/directions/create-direction'
		},
		createDirectionOrderLink: {
			href: '/app/case/' + req.params.id + '/directions/create-direction-order'
		}
	};
	res.render('app/case/continuous-online-resolution/directions/index', pageObject);
});



// Divorce service specific
router.get('/app/case/:id/make-decision', function(req, res) {

	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};

	res.render('app/case/divorce/make-decision', pageObject);

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
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/divorce/provide-reason', pageObject);
});


router.post('/app/case/:id/provide-reason', function(req, res) {
	res.redirect('generate-order');
});


router.get('/app/case/:id/generate-order', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/divorce/generate-order', pageObject);
});

router.post('/app/case/:id/generate-order', function(req, res) {
	res.redirect('confirmation');
});


// Yes option route
router.get('/app/case/:id/costs-order', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
	};
	res.render('app/case/divorce/costs-order', pageObject);
});

router.post('/app/case/:id/costs-order', function(req, res) {
	res.redirect('confirmation');
});


router.get('/app/case/:id/check-your-answers', function(req, res) {
	var pageObject = {
		casebar: helpers.getCaseBarObject(req.params.id),
		casenav: helpers.getCaseNavObject(req.params.id)
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