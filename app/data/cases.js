var caseTypes = require('./case-types');

module.exports = [

  {
    id: 'LU17C87541',
    userID: 1,
    type: 'Public Law',
    typeId: caseTypes.publicLaw.id,
    urgent: true,
    parties: [
      {
        type: 'Father',
        title: 'Mr',
        firstName: 'Brian',
        lastName: 'Martins'
      },
      {
        type: 'Mother',
        title: 'Mrs',
        firstName: 'Jane',
        lastName: 'Martins'
      }
    ],
    status: 'Unknown',
    father: 'Brian Martins represented by John Charles',
    mother: 'Jane Martins represented by Tim Dalton',
    localAuthority: 'Jeremy Saunders',
    cafcass: 'Sarah Dalton represented by Michelle Higgins',
    children: 'Jane (7yrs), Mark (3mths)',
    court: 'Luton County Court and Family Court',
    applicationDate: '10 Feb 2018',
    documents: '3 Doc (18 pages)',
    lastAction: '24 Feb 2018'
  },

  {
    id: 'BV18D00150',
    userID: 1,
    type: 'Divorce',
    typeId: caseTypes.divorce.id,
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
    applicationDate: '11 Jan 2018',
    documents: '6 Docs (8 pages)',
    lastAction: '22 Jan 2018',
    events: [
      {
        id: 1,
        date: '27 February 2018',
        time: '1:01pm',
        event: 'Application for decree nisi received',
        actionBy: 'Petitioner (D. Francis)',
        files: [
          {
            id: 1,
            name: 'Application for decree nisi',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 2,
        date: '24 February 2018',
        time: '3:22pm',
        event: 'Acknowledgement of service by the court',
        actionBy: 'Respondent (S. Francis)',
        files: [
          {
            id: 1,
            name: 'Aknowledgement of service',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 3,
        date: '18 February 2018',
        time: '1:32pm',
        event: 'Court issues petition to the respondent',
        actionBy: 'Court',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 4,
        date: '16 February 2018',
        time: '2:10pm',
        event: 'Application for divorce submitted',
        actionBy: 'Petitioner (D . Francis)',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          },
          {
            id: 2,
            name: 'Marriage certificate',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      }
    ]

  },

  {
    id: 'BV18D00151',
    userID: 1,
    type: 'Financial Remedy',
    typeId: caseTypes.financialRemedy.id,
    parties: [
      {
        type: 'Petitioner',
        firstName: 'William',
        lastName: 'Sutton',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Fran',
        lastName: 'Sutton',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    status: 'Draft concent order',
    reason: 'Separated for 2 years and consent',
    applicationDate: '23 Jan 2018',
    documents: '2 Docs (2 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events: [
      {
        id: 2,
        date: '24 February 2018',
        time: '3:22pm',
        event: 'Acknowledgement of service by the court',
        actionBy: 'Respondent (F. Sutton)',
        files: [
          {
            id: 1,
            name: 'Aknowledgement of service',
            url: '#',
            type: 'PDF',
            size: '75KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 3,
        date: '18 February 2018',
        time: '1:32pm',
        event: 'Court issues petition to the respondent',
        actionBy: 'Court',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '45KB',
            pages: '1 page'
          }
        ]
      },
      {
        id: 4,
        date: '16 February 2018',
        time: '2:10pm',
        event: 'Application for divorce submitted',
        actionBy: 'Petitioner (W . Sutton)',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          },
          {
            id: 2,
            name: 'Marriage certificate',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      }
    ]
  },

  {
    id: 'BV18D00152',
    userID: 1,
    type: 'Financial Remedy',
    typeId: caseTypes.financialRemedy.id,
    parties: [
      {
        type: 'Petitioner',
        firstName: 'Rowena',
        lastName: 'Miller',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'David',
        lastName: 'Miller',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    status: 'Draft concent order',
    reason: 'Separated for 2 years and consent',
    applicationDate: '23 Jan 2018',
    documents: '2 Docs (2 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events: [
      {
        id: 2,
        date: '24 February 2018',
        time: '3:22pm',
        event: 'Acknowledgement of service by the court',
        actionBy: 'Respondent (F. Sutton)',
        files: [
          {
            id: 1,
            name: 'Aknowledgement of service',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 3,
        date: '18 February 2018',
        time: '1:32pm',
        event: 'Court issues petition to the respondent',
        actionBy: 'Court',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 4,
        date: '16 February 2018',
        time: '2:10pm',
        event: 'Application for divorce submitted',
        actionBy: 'Petitioner (W . Sutton)',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          },
          {
            id: 2,
            name: 'Marriage certificate',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      }
    ]
  },

  {
    id: 'BV18D00153',
    userID: 1,
    type: 'Divorce',
    typeId: caseTypes.divorce.id,
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
    applicationDate: '23 Jan 2018',
    documents: '3 Docs (8 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events: [
      {
        id: 2,
        date: '24 February 2018',
        time: '3:22pm',
        event: 'Acknowledgement of service by the court',
        actionBy: 'Respondent (F. Sutton)',
        files: [
          {
            id: 1,
            name: 'Aknowledgement of service',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 3,
        date: '18 February 2018',
        time: '1:32pm',
        event: 'Court issues petition to the respondent',
        actionBy: 'Court',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 4,
        date: '16 February 2018',
        time: '2:10pm',
        event: 'Application for divorce submitted',
        actionBy: 'Petitioner (W . Sutton)',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          },
          {
            id: 2,
            name: 'Marriage certificate',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      }
    ]
  },

  {
    id: 'BV18D00154',
    userID: 1,
    type: 'Financial Remedy',
    typeId: caseTypes.financialRemedy.id,
    parties: [
      {
        type: 'Petitioner',
        firstName: 'Edwina',
        lastName: 'Skinner',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      },
      {
        type: 'Respondent',
        firstName: 'Paul',
        lastName: 'Skinner',
        representative: {
          name: '',
          role: '',
          company: ''
        }
      }
    ],
    status: 'Consider decree nisi',
    reason: 'Separated for 2 years and consent',
    applicationDate: '16 Feb 2018',
    documents: '4 Docs (8 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events: [
      {
        id: 2,
        date: '24 February 2018',
        time: '3:22pm',
        event: 'Acknowledgement of service by the court',
        actionBy: 'Respondent (F. Sutton)',
        files: [
          {
            id: 1,
            name: 'Aknowledgement of service',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 3,
        date: '18 February 2018',
        time: '1:32pm',
        event: 'Court issues petition to the respondent',
        actionBy: 'Court',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 4,
        date: '16 February 2018',
        time: '2:10pm',
        event: 'Application for divorce submitted',
        actionBy: 'Petitioner (W . Sutton)',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          },
          {
            id: 2,
            name: 'Marriage certificate',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      }
    ]
  },

  {
    id: '000LR095',
    userID: 1,
    type: 'Civil Money Claims',
    typeId: caseTypes.civilMoneyClaims.id,
    parties: [
      {
        type: 'Claimant',
        title: 'Mrs',
        firstName: 'Jan',
        lastName: 'Clark',
        dateOfBirth: '31 January 1970',
        telephone: '07824999612',
        email: 'jan.clark@gmail.com',
        address: {
          addressLine1: '101 Regents Road',
          addressLine2: 'Shiplake',
          TownCity: 'Henley on Thames',
          Postcode: 'RG9 4BW'
        },
        correspondenceAddress: {
          addressLine1: '45 Commercial Road',
          addressLine2: '',
          TownCity: 'London',
          postCode: 'W1D 5HF'
        }
      },
      {
        type: 'Defendant',
        title: 'Mrs',
        firstName: 'Mary',
        lastName: 'Richards',
        dateOfBirth: '11 October 1972',
        telephone: '07324459619',
        email: 'mary.richards@gmail.com',
        address: {
          addressLine1: '24 Acacia Drive',
          addressLine2: '',
          TownCity: 'London',
          Postcode: 'SW1 H9A'
        },
        correspondenceAddress: {
          addressLine1: '45 Commercial Road',
          addressLine2: '',
          TownCity: 'London',
          postCode: 'W1D 5HF'
        }
      }
    ],
    claimant: 'Jan Clark (Unrepresented)',
    defendant: 'Mary Richards represented by Tim Dalton',
    court: 'Edmonton County Court',
    status: 'Box work request',
    applicationDate: '18 Oct 2017',
    documents: '1 Doc (2 pages)',
    lastAction: '1 May 2018',
    events: [
      {
        id: 1,
        date: '18 October 2017',
        time: '3:25pm',
        event: 'Claim issued',
        actionBy: 'Claimant (Jan Clark)',
        files: [
          {
            id: 1,
            name: 'Claim form',
            fileName: 'n1-eng.pdf',
            originalSrc: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/688390/n1-eng.pdf',
            url: '#',
            type: 'PDF',
            size: '86KB',
            pages: '2 pages'
          }
        ]
      }
    ]
  },

  {
    id: 'CO18D00150',
    userID: 1,
    type: 'SSCS',
    typeId: caseTypes.sscs.id,
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
    status: 'Unknown',
    applicationDate: '11 Jan 2018',
    documents: '6 Docs (8 pages)',
    lastAction: '22 Jan 2018',
    urgent: false,
    benefit: 'PIP',
    tribunalCentre: 'Fox Court',
    requirements: 'Hearing loop required',
    events: [
      {
        id: 1,
        date: '27 February 2018',
        time: '1:01pm',
        event: 'Application for decree nisi received',
        actionBy: 'Petitioner (D. Francis)',
        files: [
          {
            id: 1,
            name: 'Application for decree nisi',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 2,
        date: '24 February 2018',
        time: '3:22pm',
        event: 'Acknowledgement of service by the court',
        actionBy: 'Respondent (S. Francis)',
        files: [
          {
            id: 1,
            name: 'Aknowledgement of service',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 3,
        date: '18 February 2018',
        time: '1:32pm',
        event: 'Court issues petition to the respondent',
        actionBy: 'Court',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      },
      {
        id: 4,
        date: '16 February 2018',
        time: '2:10pm',
        event: 'Application for divorce submitted',
        actionBy: 'Petitioner (D . Francis)',
        files: [
          {
            id: 1,
            name: 'Petition for divorce',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          },
          {
            id: 2,
            name: 'Marriage certificate',
            url: '#',
            type: 'PDF',
            size: '123KB',
            pages: '3 pages'
          }
        ]
      }
    ]
  }

];