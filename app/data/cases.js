var types = require('./types');
var uuid = require('uuid/v4');
var moment = require('moment');

module.exports = [

  {
    id: 'LU17C87541',
    typeId: types.publiclaw.id,
    documents: [{
      id: '1',
      label: 'A. Preliminary Documents'
    }, {
      id: '2',
      label: 'B. Application and Orders'
    }, {
      id: '3',
      label: 'C. Statements and Affidavits'
    }, {
      id: '4',
      label: 'D. Care Plans'
    }, {
      id: '5',
      label: 'E. Expert’s reports'
    }, {
      id: '6',
      label: 'F. Other Documents'
    }, {
      id: '7',
      label: 'G. Police Documents'
    }, {
      id: '8',
      label: 'H. Medical Notes'
    }],
    rounds: [],
    parties: [
      {
        type: 'Respondent',
        org: 'Luton County Court',
      },
      {
        type: 'Respondent',
        org: 'Martins',
        office: '3',
        email: 'dwp@dwp.com',
        phone: '01838 787 637'
      }
    ],
    status: 'Final Hearing',
    applicationDate: moment('2018-05-09'),
    lastAction: moment('2018-05-09'),
    court: 'Luton County Court and Family Court',
    events: [],
  }

];