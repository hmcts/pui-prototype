var express = require('express');
var router  = express.Router();

const helpers = require('./helpers');

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
router.get('/app/case/:id/costs-order', require('./actions/divorce').viewCostsOrder);

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