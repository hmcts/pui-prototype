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

router.get('/cor/v1/dashboard', function(req, res) {
	var user  = userEngine.getUsersEntry(req.session.userID);
	var caseRows = caseEngine
		.getCases()
		.filter(function(c) {
			return c.userID == req.session.userID;
		})
		.map(function(c) {
			var cells = [];
			cells.push({
				"html": '<a href="/cor/v1/case/' + c.id + '">'+ c.id +'</a>' + (c.urgent ? '<span class="jui-status  jui-status--urgent">Urgent</span>' : '')
			});
			cells.push({ "html": c.parties });
			cells.push({ "html": c.type	});
			cells.push({ "html": c.status	});
			cells.push({ "html": c.applicationDate	});
			cells.push({ "html": c.lastAction	});
			cells.push({ "html": c.fileSize	});
			return cells;
		});

	var pageObject = {
		caseRows: caseRows
	};

	res.render('cor/v1/dashboard', pageObject);

});

// Application routes v1
router.post('/cor/v1/get-new-case', function (req, res) {
	req.session.success = true;
	res.redirect('/cor/v1/case');
});

router.get('/cor/v1/case/:id', function (req, res) {
	var pageObject = {
		success: req.session.success,
		"case": caseEngine.getCase(req.params.id)
	};
	res.render('cor/v1/case/index', pageObject);
	req.session.success = null;
});

router.get('/cor/v1/case/:id/parties', function(req, res) {
	var pageObject = {
		"case": caseEngine.getCase(req.params.id)
	};
	res.render('cor/v1/case/parties', pageObject);
});

router.get('/cor/v1/case/:id/directions', function(req, res) {
	var pageObject = {};
	pageObject.case = caseEngine.getCase(req.params.id);

	if(req.session.draftDirections && req.session.draftDirections.length) {
		pageObject.draftOrder = {
			directions: req.session.draftDirections.map(function(direction) {
				var cells = [];
				cells.push({
					"html": '<a href="/cor/v1/case/directions?id='+direction.id+'">'+direction.message+'</a>'
				});
				cells.push({ "html": direction.party });
				cells.push({ "html": direction.dueDate });
				return cells;
			})
		};
	}

	if(req.session.directionOrderSuccess) {
		pageObject.directionOrderSuccess = true;
	}

	res.render('cor/v1/case/directions', pageObject);

	req.session.directionOrderSuccess = false;
});

router.get('/cor/v1/case/:id/create-direction', function(req, res) {
	var pageObject = {
		"case": caseEngine.getCase(req.params.id)
	};
	res.render('cor/v1/case/create-direction', pageObject);
});

router.post('/cor/v1/case/:id/create-direction', function (req, res) {
	if(!req.session.draftDirections) {
		req.session.draftDirections = [];
	}

	// Add posted direction to drafts
	req.session.draftDirections.push({
		id: require('uuid/v4')(),
		party: req.session.data.party,
		type: req.session.data.type,
		message: req.session.data.message,
		dueDate: req.session.data.dueDate
	});

	res.redirect('/cor/v1/case/'+req.params.id+'/directions');
});

router.get('/cor/v1/case/:id/create-direction-order', function (req, res) {
	var pageObject = {
		"case": caseEngine.getCase(req.params.id)
	};
	res.render('cor/v1/case/create-direction-order', pageObject);
});

router.post('/cor/v1/case/:id/create-direction-order', function (req, res) {
	req.session.draftDirections = null;
	req.session.directionOrderSuccess = true;
	res.redirect('/cor/v1/case/'+req.params.id+'/directions');
});

module.exports = router;