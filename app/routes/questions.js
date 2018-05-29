var express = require('express');
var router  = express.Router();
const helpers = require('./helpers');

router.get('/app/case/:id/questions', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		createQuestionsLink: {
			href: '/app/case/' + req.params.id + '/questions/create-questions'
		},
		rounds: _case.rounds
	};

	if(req.flash('success') == 'question added') {
		pageObject.success = 'Question added';
	}

	res.render('app/case/questions/index', pageObject);
});

router.get('/app/case/:id/questions/create-questions', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		_case: _case
	};
	res.render('app/case/questions/create-questions.html', pageObject);
});

router.post('/app/case/:id/questions/create-questions', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var draftRound = _case.rounds.filter(r => r.sentDate == null)[0];

	if(!draftRound) {
		draftRound = {
			id: require('uuid/v1')(),
			sentDate: null,
			questions: []
		};
		_case.rounds.push(draftRound);
	}

	req.body.questions.forEach(question => {
		draftRound.questions.push({
			subject: question.subject,
			body: question.question,
			id: require('uuid/v1')()
		});
	});

	req.flash('success', 'question added');

	res.redirect(`/app/case/${_case.id}/questions`);
});

module.exports = router;