var userEngine = require('../../models/users');
var caseEngine = require('../../models/cases');
var helpers    = require('../helpers');

function viewCaseSummary(req, res) {

	var c = caseEngine.getCase(req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(c.id),
		casenav: helpers.getCaseNavObject(c.id),
		detailsRows: [],
		representativesRows: []
	};

	// Case details
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: c.id + (c.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: c.type }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: c.status }]);
	pageObject.detailsRows.push([{ html: 'Reason for divorce' }, { html: c.reason }]);

	// Representatives
	pageObject.representativesRows.push([{ html: 'Petitioner' }, { html: c.petitioner ? c.petitioner : 'Unrepresented' }]);
	pageObject.representativesRows.push([{ html: 'Respondent' }, { html: c.respondent ? c.respondent : 'Unrepresented' }]);

	res.render('app/case/divorce/summary', pageObject);

}

exports.viewCaseSummary = viewCaseSummary;