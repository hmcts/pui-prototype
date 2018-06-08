var express = require('express');
var router  = express.Router();
var helpers = require('./helpers');
var moment = require('moment');
var uuid = require('uuid/v4');


router.get('/app/cases/:id/questions', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		appellantName: helpers.getAppellantName(_case),
		createQuestionsLink: {
			href: '/app/cases/' + req.params.id + '/questions/new'
		},
		sendQuestionsLink: {
			href: `/app/cases/${_case.id}/questions/check`
		}
	};

	var rounds = _case.rounds.sort((a, b) => {
		if(a.dateSent < b.dateSent) {
			return -1;
		}
		if(a.dateSent > b.dateSent) {
			return 1;
		}
		return 0;
	}).reverse();

	var sentRounds = _case.rounds.filter(round => round.dateSent !== null);

	sentRounds.forEach((round, i) => {
		round.number = sentRounds.length-i;
		round.dateDue = moment(round.dateSent).add(7, 'days').toDate();
		round.overdue = moment() > moment(round.dateDue).add(1, 'days');
		round.areAllQuestionsAnswered = round.questions.filter(question => question.response).length === round.questions.length;
	});

	var draftRound = _case.rounds.filter(round => round.dateSent === null)[0] || {};

	if(draftRound) {
		draftRound.number = sentRounds.length + 1;
	}

	pageObject.sentRounds = sentRounds;
	pageObject.draftRound = draftRound;


	var successFlash = req.flash('success');

	if(successFlash[0] == 'question added') {
		pageObject.success = 'Question added';
	}

	if(successFlash[0] == 'questions sent') {
		pageObject.success = 'Questions sent';
	}

	if(successFlash[0] == 'question deleted') {
		pageObject.success = 'Question deleted';
	}

	if(successFlash[0] == 'question updated') {
		pageObject.success = 'Question updated';
	}

	res.render('app/case/questions/index', pageObject);

});

router.get('/app/cases/:id/questions/check', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		backLink: {
			href: `/app/cases/${_case.id}/questions/`
		},
		questions: _case.rounds.filter(round => round.dateSent === null)[0].questions,
		_case: _case
	};

	res.render('app/case/questions/check', pageObject);

});


router.post('/app/cases/:id/questions/send', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var round = _case.rounds.filter(round => round.dateSent === null)[0];

	round.dateSent = new Date();

	req.flash('success', 'questions sent');

	res.redirect(`/app/cases/${_case.id}/questions`);

});


router.get('/app/cases/:id/questions/new', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		caseActions: helpers.getCaseActions(_case),
		_case: _case
	};

	res.render('app/case/questions/new.html', pageObject);

});


router.post('/app/cases/:id/questions/new', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var draftRound = _case.rounds.filter(r => r.dateSent == null)[0];

	if(!draftRound) {
		draftRound = {
			id: uuid(),
			dateSent: null,
			questions: []
		};
		_case.rounds.push(draftRound);
	}

	req.body.questions.forEach(question => {
		draftRound.questions.push({
			subject: question.subject,
			body: question.question,
			id: uuid(),
			author: 'Judge Prita Shah',
			dateCreated: new Date()
		});
	});

	req.flash('success', 'question added');

	res.redirect(`/app/cases/${_case.id}/questions`);

});


router.get('/app/cases/:case_id/questions/:question_id', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.case_id);

	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};

	var question = helpers.getQuestion(_case, req.params.question_id);

	pageObject.question = question;
	pageObject.response = question.response;
	pageObject.isDraftQuestion = helpers.isDraftQuestion(_case, req.params.question_id);
	pageObject.editQuestionLink = {
		href: `/app/cases/${_case.id}/questions/${question.id}/edit`
	};
	pageObject.deleteQuestionLink = {
		href: `/app/cases/${_case.id}/questions/${question.id}/delete`
	};

	res.render('app/case/questions/show', pageObject);

});

router.get('/app/cases/:case_id/questions/:question_id/edit', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.case_id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};

	var question = helpers.getQuestion(_case, req.params.question_id);
	pageObject.question = question;
	pageObject.backLink = {
		href: `/app/cases/${_case.id}/questions/${question.id}`
	};

	res.render('app/case/questions/edit', pageObject);

});

router.post('/app/cases/:case_id/questions/:question_id/edit', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.case_id);

	var question = helpers.getQuestion(_case, req.params.question_id);

	question.subject = req.body.subject;
	question.body = req.body.body;
	question.dateChanged = new Date();

	req.flash('success', 'question updated')

	res.redirect(`/app/cases/${_case.id}/questions`);

});

router.get('/app/cases/:case_id/questions/:question_id/delete', (req, res) => {
	var _case = helpers.getCase(req.session.cases, req.params.case_id);
	var question = helpers.getQuestion(_case, req.params.question_id);
	var pageObject = {
		_case: _case,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		question: question,
		backLink: {
			href: `/app/cases/${_case.id}/questions/${question.id}`
		}
	};

	res.render('app/case/questions/delete', pageObject);

});

router.post('/app/cases/:case_id/questions/:question_id/delete', (req, res) => {

	var _case = helpers.getCase(req.session.cases, req.params.case_id);

	helpers.removeQuestion(_case, helpers.getQuestion(_case, req.params.question_id));

	req.flash('success', 'question deleted');

	res.redirect(`/app/cases/${_case.id}/questions`);

});


module.exports = router;