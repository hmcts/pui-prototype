var userEngine = require('../../data/users');
var caseEngine = require('../../data/cases');
var helpers    = require('../helpers');

function viewCaseSummary(req, res) {

	var c = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(c.id),
		casenav: helpers.getCaseNavObject(c.id),
		detailsRows: [],
		partiesRepresentativesRows: []
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Parties' }, { html: helpers.getPartiesLine(c.id) }]);
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: c.id + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: c.type }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: c.status }]);
	pageObject.detailsRows.push([{ html: 'Court' },	{ html: c.court }]);

	// Parties and representatives
	pageObject.partiesRepresentativesRows.push([{ html: 'Father' }, { html: c.father ? c.father : 'Unrepresented' }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Mother' }, { html: c.mother ? c.mother : 'Unrepresented' }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Local authority' }, { html: c.localAuthority }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Cafcass' }, { html: c.cafcass }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Children' }, { html: c.children }]);

	res.render('app/case/public-law/summary', pageObject);

}

exports.viewCaseSummary = viewCaseSummary;