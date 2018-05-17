var userEngine = require('../models/users');
var caseEngine = require('../models/cases');


function getPartiesLine(caseId) {

	return caseEngine.getCase(caseId).parties.map(function(party) {

		if(party.org) {
			return party.org;
		} else {
			return party.firstName + ' ' + party.lastName;
		}

	}).join(' vs ');

}


function getCaseObject(id) {
	var c = caseEngine.getCase(id);

	var caseBarObject = {
		parties: c.parties.map(function(party) {
			return party.firstName + ' ' + party.lastName;
		}).join(' vs '),
		id: c.id
	};

	return caseBarObject;
}


function getCaseNavObject(caseId) {

	var c = caseEngine.getCase(caseId);

	switch(c.type) {

		case 'Continuous Online Resolution':
			return {
				id: caseId,
				parties: true,
				questions: true,
				directions: true
			};

		case 'Divorce':
			return {
				id: caseId,
				parties: true
			};

		case 'Financial Remedy':
			return {
				id: caseId,
				parties: true
			};

		case 'Civil Money Claims':
			return {
				id: caseId,
				parties: true
			};

		case 'Public Law':
			return {
				id: caseId,
				parties: true
			};

	}
}


function getCaseBarObject(caseId) {
	return {
		parties: getPartiesLine(caseId),
		id: caseId
	};
}

function getCase(cases, caseId) {
	return cases.filter(c => c.id == caseId)[0];
}

exports.getCaseBarObject = getCaseBarObject;
exports.getCaseNavObject = getCaseNavObject;
exports.getCaseObject    = getCaseObject;
exports.getPartiesLine   = getPartiesLine;
exports.getCase = getCase;