var helpers = require('../helpers');

function viewCaseSummary(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		success: req.session.success,
		casebar: helpers.getCaseBarObject(_case),
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

exports.viewCaseSummary = viewCaseSummary;