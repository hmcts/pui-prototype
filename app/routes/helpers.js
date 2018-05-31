var caseTypes = require('../data/case-types');

function getPartiesLine(_case) {
	return _case.parties.map(function(party) {
		if(party.org) {
			return party.org;
		} else {
			return party.firstName + ' ' + party.lastName;
		}

	}).join(' vs ');
}

function getCaseType(_case) {
	var caseType = '';
	Object.keys(caseTypes).forEach(function(key) {
		if(caseTypes[key].id == _case.typeId) {
			caseType = caseTypes[key].label;
		}
	});
	return caseType;
}

function getCaseNavObject(_case) {
	switch(_case.typeId) {
		case 'sscs':
			return {
				id: _case.id,
				questions: true
			};
		case 'divorce':
			return {
				id: _case.id,
				parties: true
			};
	}
}

function getCaseActions(_case) {
	switch(_case.typeId) {
		case 'sscs':
		return [
			{
				href: `/app/case/${_case.id}/make-decision`,
				text: 'Make decision'
			},
			{
				href: `/app/case/${_case.id}/list-for-hearing`,
				text: 'List for hearing'
			}
		];
		case 'divorce':
			return [
				{
					href: `/app/case/${_case.id}/make-decision`,
					text: 'Make decision'
				},
				{
					href: `/app/case/${_case.id}/mark-as-prepared`,
					text: 'Mark as prepared'
				},
				{
					href: `/app/case/${_case.id}/reassign`,
					text: 'Reassign'
				}
			];
	}
}

function getCaseBarObject(_case) {
	return {
		parties: getPartiesLine(_case),
		id: _case.id
	};
}

function getCase(cases, caseId) {
	return cases.filter(c => c.id == caseId)[0];
}

function getQuestion(_case, questionId) {
	var question = null;
	_case.rounds.forEach(function(round) {
		question = round.questions.filter(q => q.id = questionId)[0] || null;
	});
	return question;
}

exports.getCaseBarObject = getCaseBarObject;
exports.getCaseNavObject = getCaseNavObject;
exports.getPartiesLine   = getPartiesLine;
exports.getCase = getCase;
exports.getCaseType = getCaseType;
exports.getCaseActions = getCaseActions;
exports.getQuestion = getQuestion;