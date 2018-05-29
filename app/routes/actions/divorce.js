var helpers = require('../helpers');

function viewCaseSummary(req, res) {

	var c = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(c),
		caseActions: helpers.getCaseActions(c),
		casenav: helpers.getCaseNavObject(c),
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

function viewMakeDecision(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};
	res.render('app/case/divorce/make-decision', pageObject);
}

function viewParties(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case),
		casenav: helpers.getCaseNavObject(_case)
	};
	res.render('app/case/divorce/parties', pageObject);
}

function viewCostsOrder(req, res) {
	var _case = helpers.getCase(req.session.cases, req.params.id);
	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		caseActions: helpers.getCaseActions(_case)
	};
	res.render('app/case/divorce/costs-order', pageObject);
}

exports.viewCaseSummary = viewCaseSummary;
exports.viewMakeDecision = viewMakeDecision;
exports.viewParties = viewParties;
exports.viewCostsOrder = viewCostsOrder;