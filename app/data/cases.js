var types = require('./types');
var uuid = require('uuid/v4');
var moment = require('moment');

module.exports = [

  {
    id: 'SC1231612323',
    typeId: types.pip.id,
    documents: [{
      id: '1',
      label: 'Personal Independence Payment'
    }, {
      id: '2',
      label: 'Decision Notice'
    }],
    rounds: [],
    parties: [
      {
        type: 'Appellant',
        firstName: 'Alan',
        lastName: 'Jones',
        representative: null
      },
      {
        type: 'Respondent',
        org: 'DWP',
        office: '3',
        email: 'dwp@dwp.com',
        phone: '01838 787 637',
        decisionMaker: {
          firstName: 'Denise',
          lastName: 'Okenwe'
        },
        presentingOfficer: {
          firstName: 'Claire',
          lastName: 'Potter'
        }
      }
    ],
    status: 'Party replied',
    applicationDate: moment('2018-05-09'),
    lastAction: moment('2018-05-09'),
    urgent: false,
    tribunalCentre: 'Fox Court',
    requirements: 'Hearing loop required',
    events: [
      {
        id: uuid(),
        date: moment('2017-11-20 13:01'),
        title: 'New Direct Lodgement Registration',
        by: 'DLC Admin'
      },

      {
        id: uuid(),
        date: moment('2017-11-20 14:21'),
        title: 'Complex appeal – requires further guidance',
        by: 'DLC Admin'
      },

      {
        id: uuid(),
        date: moment('2017-11-20 14:27'),
        title: 'Interlocutory referral to DJ DeVere',
        by: 'DLC Admin'
      },

      {
        id: uuid(),
        date: moment('2017-12-05 09:10'),
        title: 'Appeal marked as compliant',
        by: 'DJ DeVere'
      },

      {
        id: uuid(),
        date: moment('2018-01-25 16:48'),
        title: 'Response submitted',
        by: 'DWP Appeals Officer'
      }
    ],
  }

];