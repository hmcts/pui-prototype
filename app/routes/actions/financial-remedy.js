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
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: _case.id + (_case.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: _case.type }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: _case.status }]);
	pageObject.detailsRows.push([{ html: 'Reason for divorce' }, { html: _case.reason }]);


	// Representatives
	pageObject.representativesRows.push([{ html: 'Petitioner' }, { html: _case.petitioner ? _case.petitioner : 'Unrepresented' }]);
	pageObject.representativesRows.push([{ html: 'Respondent' }, { html: _case.respondent ? _case.respondent : 'Unrepresented' }]);

	res.render('app/case/financial-remedy/summary', pageObject);

}

exports.viewCaseSummary = viewCaseSummary;