const express = require('express');
const router  = express.Router();


const userEngine = require('../models/users');
const caseEngine = require('../models/cases');

// Prototype setup

router.get('/cor/v1', function (req, res) {
	res.render('cor/v1/index', {
		users: userEngine.getUsersEntries()
	});
});

router.get('/cor/load-user/:id/', function(req, res) {
	req.session.userID = req.params.id;
	res.redirect('/cor/v1/dashboard');
});

// Application routes v1

router.post('/cor/v1/get-new-case', function (req, res) {
	req.session.success = true;
	res.redirect('/cor/v1/case');
});

router.get('/cor/v1/case', function (req, res) {
	res.render('cor/v1/case/index', { success: req.session.success });
	req.session.success = null;
});

router.post('/cor/v1/case/create-direction', function (req, res) {
	if(!req.session.draftDirections) {
		req.session.draftDirections = [];
	}

	// Add posted direction to drafts
	req.session.draftDirections.push({
		id: require('uuid/v4')(),
		party: req.session.data.party,
		type: req.session.data.type,
		subject: req.session.data.subject,
		dueDate: req.session.data.dueDate
	});

	res.redirect('/cor/v1/case/directions');
});

router.get('/cor/v1/case/directions', function (req, res) {
	var pageObject = {};

	if(req.session.draftDirections && req.session.draftDirections.length) {
		pageObject.draftOrder = {
			directions: req.session.draftDirections.map(function(direction) {
				var cells = [];

				cells.push({
					"html": '<a href="/cor/v1/case/directions?id='+direction.id+'">'+direction.subject+'</a>'
				});
				cells.push({
					"html": direction.party
				});
				cells.push({
					"html": direction.dueDate
				});
				return cells;
			})
		};
	}
	res.render('cor/v1/case/directions', pageObject);
});

module.exports = router;