var helpers = require('../helpers');

function getCaseActions(_case) {
	return [
		{
			href: `/app/case/${_case.id}/make-decision`,
			text: 'Make decision'
		},
		{
			href: `/app/case/${_case.id}/list-for-hearing`,
			text: 'List for hearing'
		}
	]
}

function viewCaseSummary(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		success: req.session.success,
		casebar: helpers.getCaseBarObject(_case),
		caseActions: getCaseActions(_case),
		casenav: helpers.getCaseNavObject(_case),
		detailsRows: [],
		panelRows: []
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Parties' }, {html: helpers.getPartiesLine(_case)}]);
	pageObject.detailsRows.push([{ html: 'Case number' }, {html: _case.id}]);
	pageObject.detailsRows.push([{ html: 'Case type' }, {html: _case.benefit}]);
	pageObject.detailsRows.push([{ html: 'Tribunal centre' }, {html: _case.tribunalCentre}]);
	pageObject.detailsRows.push([{ html: 'Additional requirements' }, {html: _case.requirements}]);

	res.render('app/case/sscs/summary', pageObject);
}

function viewMakeDecision(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: getCaseActions(_case)
	};
	res.render('app/case/divorce/make-decision', pageObject);
}

exports.viewCaseSummary = viewCaseSummary;
exports.viewMakeDecision = viewMakeDecision;