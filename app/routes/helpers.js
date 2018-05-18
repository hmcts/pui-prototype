function getPartiesLine(_case) {
	return _case.parties.map(function(party) {
		if(party.org) {
			return party.org;
		} else {
			return party.firstName + ' ' + party.lastName;
		}

	}).join(' vs ');
}

function getCaseNavObject(_case) {
	switch(_case.type) {
		case 'Continuous Online Resolution':
			return {
				id: _case.id,
				parties: true,
				questions: true,
				directions: true
			};
		case 'Divorce':
			return {
				id: _case.id,
				parties: true
			};
		case 'Financial Remedy':
			return {
				id: _case.id,
				parties: true
			};
		case 'Civil Money Claims':
			return {
				id: _case.id,
				parties: true
			};
		case 'Public Law':
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