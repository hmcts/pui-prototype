var helpers = require('../helpers');

function viewCaseSummary(req, res) {

	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		detailsRows: [],
		representativesRows: []
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Parties' }, {html: helpers.getPartiesLine(_case)}]);
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: _case.id + (_case.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: _case.type }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: _case.status }]);
	pageObject.detailsRows.push([{ html: 'Court' },	{ html: _case.court }]);

	// Panel
	pageObject.representativesRows.push([{ html: 'Claimant' }, { html: _case.claimant ? _case.claimant : '(Unrepresented)' }]);
	pageObject.representativesRows.push([{ html: 'Defendant' }, { html: _case.defendant ? _case.defendant : '(Unrepresented)' }]);

	res.render('app/case/civil-money-claims/summary', pageObject);

}

exports.viewCaseSummary = viewCaseSummary;