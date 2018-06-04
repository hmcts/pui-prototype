var helpers = require('../helpers');

function viewCaseSummary(req, res) {
	
	var _case = helpers.getCase(req.session.cases, req.params.id);

	var pageObject = {
		casebar: helpers.getCaseBarObject(_case),
		casenav: helpers.getCaseNavObject(_case),
		detailsRows: [],
		partiesRepresentativesRows: []
	};


	// Case details
	pageObject.detailsRows.push([{ html: 'Parties' }, { html: helpers.getPartiesLine(_case) }]);
	pageObject.detailsRows.push([{ html: 'Case number' },	{ html: _case.id + (_case.urgent ? ' <span class="jui-status  jui-status--urgent  govuk-!-ml-r1">Urgent</span> ' : '') }]);
	pageObject.detailsRows.push([{ html: 'Case type' },	{ html: _case.type }]);
	pageObject.detailsRows.push([{ html: 'Case status' },	{ html: _case.status }]);
	pageObject.detailsRows.push([{ html: 'Court' },	{ html: _case.court }]);


	// Parties and representatives
	pageObject.partiesRepresentativesRows.push([{ html: 'Father' }, { html: _case.father ? _case.father : 'Unrepresented' }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Mother' }, { html: _case.mother ? _case.mother : 'Unrepresented' }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Local authority' }, { html: _case.localAuthority }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Cafcass' }, { html: _case.cafcass }]);
	pageObject.partiesRepresentativesRows.push([{ html: 'Children' }, { html: _case.children }]);

	res.render('app/case/public-law/summary', pageObject);

}

exports.viewCaseSummary = viewCaseSummary;