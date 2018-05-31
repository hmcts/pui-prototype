var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var moment = require('moment');


router.get('/app/case/:id/questions', function(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		createQuestionsLink: {
			href: '/app/case/' + req.params.id + '/questions/create-questions'
		}
	};

	var sentRounds = _case.rounds.filter(round => round.sentDate !== null);

	var draftRound = _case.rounds.filter(round => round.sentDate === null)[0] || {};
	if(draftRound) {
		// lets update the format of the date
		if(draftRound.questions) {
			draftRound.questions = draftRound.questions.map(function(question) {
				question.dateAdded = moment(question.dateAdded).format('D MMM YYYY');
				return question;
			});
		}

		draftRound.number = sentRounds.length + 1;
	}

	pageObject.sentRounds = sentRounds;
	pageObject.draftRound = draftRound;

	//

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
			id: require('uuid/v1')(),
			author: 'Judge Prita Shah',
			dateAdded: new Date()
		});
	});

	req.flash('success', 'question added');

	res.redirect(`/app/case/${_case.id}/questions`);
});


router.get('/app/case/:case_id/questions/:question_id', function(req, res) {

	var _case = helpers.getCase(req.session.cases, req.params.case_id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		question: helpers.getQuestion(_case, req.params.question_id)
	};

	res.render('app/case/questions/question', pageObject);
});


module.exports = router;