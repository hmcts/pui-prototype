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
				parties: true,
				questions: true,
				directions: true
			};
		case 'divorce':
			return {
				id: _case.id,
				parties: true
			};
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

exports.getCaseBarObject = getCaseBarObject;
exports.getCaseNavObject = getCaseNavObject;
exports.getPartiesLine   = getPartiesLine;
exports.getCase = getCase;
exports.getCaseType = getCaseType;