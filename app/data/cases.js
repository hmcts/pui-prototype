var types = require('./types');
var uuid = require('uuid/v4');
var moment = require('moment');

module.exports = [

  {
    id: 'SC1231612322',
    typeId: types.pip.id,
    status: 'Deadline expired',
    applicationDate: moment('2018-05-09'),
    documents: '6 Docs (8 pages)',
    lastAction: moment('2018-05-09'),
    urgent: true,
    tribunalCentre: 'Fox Court',
    requirements: 'Assisted Digital support requested',
    events: [
      {
        id: uuid(),
        date: moment('2018-04-27 13:30'),
        title: 'Compliant appeal'
      },
      {
        id: uuid(),
        date: moment('2018-04-27 09:34'),
        title: 'Directions issued to Appellant'
      },
      {
        id: uuid(),
        date: moment('2018-04-26'),
        title: 'GAPS to Apppellant Officer'
      }
    ],
    rounds: [{
      id: uuid(),
      dateSent: null,
      questions: []
    },{
      id: uuid(),
      dateSent: moment('2018-05-28').toDate(),
      questions: [{
        id: uuid(),
        subject: 'How do you do your shopping?',
        body: 'Explain how you do your shopping. Include information about how often you go to the shops, how you get there and how you get your food from the shops to your home.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-05-28').toDate(),
        dateCreated: moment('2018-05-28').toDate(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: new Date(),
          body: '<p>I have a walk-in bath and a shower but I don’t use the shower since the accident because I can’t put my arms above my head and it makes it painful.</p>'
        }
      },
      {
        id: uuid(),
        subject: 'How you prepare your food?',
        body: 'Explain how you prepare your meals. Include information about the types of meals you eat, how you prepare them and whether there are any tasks in the kitchen you need assistance with.',
        author: 'Judge Prita Shah',
        dateChanged: new Date(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: moment('2018-05-28').toDate(),
          body: '<p>I have a walk-in bath and a shower but I don’t use the shower since the accident because I can’t put my arms above my head and it makes it painful.</p>'
        }
      },
      {
        id: uuid(),
        subject: 'How you wash yourself?',
        body: 'Explain how you wash yourself. Include information about whether you usually bath or shower.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-05-28').toDate(),
        dateCreated: moment('2018-05-28').toDate(),
        attachments: [],
        response: false
      }]
    }],
    parties: [
      {
        type: 'Appellant',
        firstName: 'Warren',
        lastName: 'Sutton',
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
  },

  {
    id: 'SC1231612323',
    typeId: types.pip.id,
    rounds: [{
      id: uuid(),
      dateSent: null,
      questions: [{
        id: uuid(),
        subject: 'How do you do your shopping?',
        body: 'Explain how you do your shopping. Include information about how often you go to the shops, how you get there and how you get your food from the shops to your home.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-04-22').toDate(),
        dateCreated: moment('2018-04-22').toDate(),
        attachments: [],
        response: null
      }, {
        id: uuid(),
        subject: 'How you prepare your food?',
        body: 'Explain how you prepare your meals. Include information about the types of meals you eat, how you prepare them and whether there are any tasks in the kitchen you need assistance with.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-04-23').toDate(),
        dateCreated: moment('2018-04-23').toDate(),
        attachments: [],
        response: null
      }]
    },{
      id: uuid(),
      dateSent: moment('2018-04-20').toDate(),
      questions: [{
        id: uuid(),
        subject: 'How you wash yourself?',
        body: 'Explain how you wash yourself. Include information about whether you usually bath or shower.',
        author: 'Judge Prita Shah',
        dateChanged: moment('2018-04-20').toDate(),
        dateCreated: moment('2018-04-20').toDate(),
        attachments: [],
        response: {
          author: 'Appellant',
          date: moment('2018-04-21').toDate(),
          body: '<p>I have a walk-in bath and a shower but I don’t use the shower since the accident because I can’t put my arms above my head and it makes it painful.</p>'
        }
      }]
    }],
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
    documents: '6 Docs (8 pages)',
    lastAction: moment('2018-05-09'),
    urgent: false,
    tribunalCentre: 'Fox Court',
    requirements: 'Hearing loop required',
    events: [
      {
        id: uuid(),
        date: moment('2018-04-27 13:30'),
        title: 'Compliant appeal'
      },
      {
        id: uuid(),
        date: moment('2018-04-27 09:34'),
        title: 'Directions issued to Appellant'
      },
      {
        id: uuid(),
        date: moment('2018-04-26'),
        title: 'GAPS to Apppellant Officer'
      }
    ],
  },

  {
    id: 'BV18D00150',
    typeId: types.divorce.id,
    parties: [
      {
        type: 'Petitioner',
        firstName: 'David',
        lastName: 'Francis',
        representative: {
          name: 'Clive Walters',
          role: 'Solicitor',
          company: 'Chadwick and Walters'
        }
      },
      {
        type: 'Respondent',
        firstName: 'Susan',
        lastName: 'Francis',
        representative: {
          name: 'David Jones',
          role: 'Solicitor',
          company: 'Chadwick and Walters'
        }
      }
    ],
    status: 'Consider decree nisi',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: '6 Docs (8 pages)',
    lastAction: moment('2018-05-09'),
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'Petitioner (D. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'Respondent (S. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-16 14:10'),
        title: 'Application for divorce submitted',
        by: 'Petitioner (D . Francis)'
      }
    ]
  },

  {
    id: 'BV18D00153',
    typeId: types.divorce.id,
    parties: [
      {
        type: 'Petitioner',
        firstName: 'Thomas',
        lastName: 'Jones',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Victoria',
        lastName: 'Jones',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    status: 'Consider decree nisi',
    reason: 'Separated for 2 years and consent',
    applicationDate: moment('2018-05-09'),
    documents: '3 Docs (8 pages)',
    lastAction: moment('2018-05-09'),
    petitioner: '',
    respondent: '',
    events: [
      {
        id: uuid(),
        date: moment('2018-02-27 13:01'),
        title: 'Application for decree nisi received',
        by: 'Petitioner (D. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-24 15:22'),
        title: 'Acknowledgement of service by the court',
        by: 'Respondent (S. Francis)'
      },
      {
        id: uuid(),
        date: moment('2018-04-16 14:10'),
        title: 'Application for divorce submitted',
        by: 'Petitioner (D . Francis)'
      }
    ]
  }

];