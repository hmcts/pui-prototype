var types = require('../data/types');

function getPartiesLine(_case) {
	return _case.parties.map(function(party) {
		if(party.org) {
			return party.org;
		} else {
			return party.firstName + ' ' + party.lastName;
		}

	}).join(' versus ');
}

function getCaseType(_case) {
	var caseType = '';
	Object.keys(types).forEach(function(key) {
		if(types[key].id == _case.typeId) {
			caseType = types[key].id;
		}
	});
	return caseType;
}

function getCaseTypeLabel(_case) {
	var caseType = '';
	Object.keys(types).forEach(function(key) {
		if(types[key].id == _case.typeId) {
			caseType = types[key].label;
		}
	});
	return caseType;
}

function getCaseNavObject(_case) {
	switch(_case.typeId) {
		case 'pip':
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
		case 'pip':
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
	var q = null;

	for(let round of _case.rounds) {
		for(let question of round.questions) {
			if(question.id === questionId) {
				q = question;
				break;
			}
		}
	}
	return q;
}

function isDraftQuestion(_case, questionId) {
	var isDraft = false;
	for(let round of _case.rounds) {
		for(let question of round.questions) {
			if(question.id === questionId && !round.dateSent) {
				isDraft = true;
				break;
			}
		}
	}
	return isDraft;
}

function removeQuestion(_case, question) {
	for(let round of _case.rounds) {
		removeItemFromArray(round.questions, question);
	}
}

function removeItemFromArray(array, element) {
	const index = array.indexOf(element);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

exports.getCaseBarObject = getCaseBarObject;
exports.getCaseNavObject = getCaseNavObject;
exports.getPartiesLine   = getPartiesLine;
exports.getCase = getCase;
exports.getCaseType = getCaseType;
exports.getCaseTypeLabel = getCaseTypeLabel;
exports.getCaseActions = getCaseActions;
exports.getQuestion = getQuestion;
exports.isDraftQuestion = isDraftQuestion;
exports.removeQuestion = removeQuestion;
exports.removeItemFromArray = removeItemFromArray;