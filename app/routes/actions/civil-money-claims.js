var userEngine = require('../../data/users');
var caseEngine = require('../../data/cases');
var helpers    = require('../helpers');

function viewCaseSummary(req, res) {

	var c = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(c.id),
		casenav: helpers.getCaseNavObject(c.id),
		detailsRows: [],
		representativesRows: []
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Parties' }, {html: helpers.getPartiesLine(c.id)}]);
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: c.id + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: c.type }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: c.status }]);
	pageObject.detailsRows.push([{ html: 'Court' },	{ html: c.court }]);

	// Panel
	pageObject.representativesRows.push([{ html: 'Claimant' }, { html: c.claimant ? c.claimant : '(Unrepresented)' }]);
	pageObject.representativesRows.push([{ html: 'Defendant' }, { html: c.defendant ? c.defendant : '(Unrepresented)' }]);

	res.render('app/case/civil-money-claims/summary', pageObject);

}

exports.viewCaseSummary = viewCaseSummary;