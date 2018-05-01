var cases = [

  {
    id: 'BV18D00150',
    userID: 1,
    parties: [
      {
        type: "Petitioner",
        firstName: "D",
        lastName: "Francis",
        representative: {
          name: "Clive Walters",
          role: "Solicitor",
          company: "Chadwick and Walters"
        }
      },
      {
        type: "Respondent",
        firstName: "S",
        lastName: "Francis",
        representative: {
          name: "David Jones",
          role: "Solicitor",
          company: "Chadwick and Walters"
        }
      }
    ],
    type: 'Divorce',
    status: 'Consider decree nisi',
    reason: 'Adultery',
    applicationDate: '11 Jan 2018',
    documents: '6 Docs (8 pages)',
    lastAction: '22 Jan 2018',
    urgent: true,
    events:  [
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
    parties: [
      {
        type: "Petitioner",
        firstName: "W",
        lastName: "Sutton",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      },
      {
        type: "Respondent",
        firstName: "F",
        lastName: "Sutton",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      }
    ],
    type: 'Financial Remedy',
    status: 'Draft concent order',
    reason: 'Adultery',
    applicationDate: '23 Jan 2018',
    documents: '2 Docs (2 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events:  [
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
    id: 'BV18D00152',
    userID: 1,
    parties: [
      {
        type: "Petitioner",
        firstName: "R",
        lastName: "Miller",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      },
      {
        type: "Respondent",
        firstName: "D",
        lastName: "Miller",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      }
    ],
    type: 'Financial Remedy',
    status: 'Draft concent order',
    reason: 'Adultery',
    applicationDate: '23 Jan 2018',
    documents: '2 Docs (2 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events:  [
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
    parties: [
      {
        type: "Petitioner",
        firstName: "T",
        lastName: "Jones",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      },
      {
        type: "Respondent",
        firstName: "V",
        lastName: "Jones",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      }
    ],
    type: 'Divorce',
    status: 'Consider decree nisi',
    reason: 'Adultery',
    applicationDate: '23 Jan 2018',
    documents: '3 Docs (8 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events:  [
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
    parties: [
      {
        type: "Petitioner",
        firstName: "E",
        lastName: "Skinner",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      },
      {
        type: "Respondent",
        firstName: "P",
        lastName: "Skinner",
        representative: {
          name: "",
          role: "",
          company: ""
        }
      }
    ],
    type: 'Financial Remedy',
    status: 'Consider decree nisi',
    reason: 'Adultery',
    applicationDate: '16 Feb 2018',
    documents: '4 Docs (8 pages)',
    lastAction: '16 Feb 2018',
    petitioner: '',
    respondent: '',
    events:  [
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
    parties: [
      {
        type: "Claimant",
        title: "Mrs",
        firstName: "Jan",
        lastName: "Clark",
        dateOfBirth: "31 January 1970",
        telephone: "07824999612",
        email: "jan.clark@gmail.com",
        address: {
          addressLine1: "101 Regents Road",
          addressLine2: "Shiplake",
          TownCity: "Henley on Thames",
          Postcode: "RG9 4BW"
        },
        correspondenceAddress: {
          addressLine1: "45 Commercial Road",
          addressLine2: "",
          TownCity: "London",
          postCode: "W1D 5HF"
        }
      },
      {
        type: "Defendant",
        title: "Mrs",
        firstName: "Mary",
        lastName: "Richards",
        dateOfBirth: "11 October 1972",
        telephone: "07324459619",
        email: "mary.richards@gmail.com",
        address: {
          addressLine1: "24 Acacia Drive",
          addressLine2: "",
          TownCity: "London",
          Postcode: "SW1 H9A"
        },
        correspondenceAddress: {
          addressLine1: "45 Commercial Road",
          addressLine2: "",
          TownCity: "London",
          postCode: "W1D 5HF"
        }
      }
    ],
    type: 'Civil Money Claims',
    court: "Edmonton County Court",
    status: 'Small claims',
    applicationDate: '18 October 2017',
    documents: '1 Doc (2 pages)',
    lastAction: '1 May 2018',
    events:  [
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
  }

];

exports.getCases = function() {
  return cases;
};

exports.getCasesEntry = function(id) {
  for(var i=0; i < cases.length; i++) {
    if(cases[i].id == id) return cases[i];
  }
};

exports.getCase = function(caseId) {
  return cases.filter(function(c) {
    return c.id == caseId;
  })[0] || null;
};