var cases = [

  {
    id: "BV18D00150",
    userID: 1,
    "number": "BV18D00150",
    "parties": "D. Francis vs S. Francis",
    "type": "Divorce",
    "status": "Consider decree nisi",
    "grounds": "Adultery",
    "applicationDate": "16 Feb 2018",
    "documents": "6 Docs",
    "lastAction": "16 Feb 2018",
    "petitioner": "Clive Walters",
    "respondent": "David Jones",
    "urgent": true,
    "events":  [
      {
        id: 1,
        "date": "27 February 2018",
        "time": "1:01pm",
        "event": "Application for decree nisi received",
        "actionBy": "Petitioner (D. Francis)",
        "files": [
          {
            id: 1,
            "name": "Application for decree nisi",
            "type": "PDF",
            "size": "123KB",
            "pages": "3 pages"
          }
        ]
      },
      {
        id: 2,
        "date": "24 February 2018",
        "time": "3:22pm",
        "event": "Acknowledgement of service by the court",
        "actionBy": "Respondent (S. Francis)",
        "files": [
          {
            id: 1,
            "name": "Aknowledgement of service",
            "type": "PDF",
            "size": "123KB",
            "pages": "3 pages"
          }
        ]
      },
      {
        id: 3,
        "date": "18 February 2018",
        "time": "1:32pm",
        "event": "Court issues petition to the respondent",
        "actionBy": "Court",
        "files": [
          {
            id: 1,
            "name": "Petition for divorce",
            "type": "PDF",
            "size": "123KB",
            "pages": "3 pages"
          }
        ]
      },
      {
        id: 4,
        "date": "16 February 2018",
        "time": "2:10pm",
        "event": "Application for divorce submitted",
        "actionBy": "Petitioner (D . Francis)",
        "files": [
          {
            id: 1,
            "name": "Petition for divorce",
            "type": "PDF",
            "size": "123KB",
            "pages": "3 pages"
          },
          {
            id: 2,
            "name": "Marriage certificate",
            "type": "PDF",
            "size": "123KB",
            "pages": "3 pages"
          }
        ]
      }
    ]

  },

  {
    id: "BV18D00151",
    userID: 1,
    "number": "BV18D00151",
    "parties": "W. Sutton vs F. Sutton",
    "type": "Financial Remedy",
    "status": "Draft concent order",
    "grounds": "Adultery",
    "applicationDate": "16 Feb 2018",
    "documents": "2 Docs",
    "lastAction": "16 Feb 2018"
  },

  {
    id: "BV18D00152",
    userID: 1,
    "number": "BV18D00152",
    "parties": "R. Miller vs D. Miller",
    "type": "Financial Remedy",
    "status": "Draft concent order",
    "grounds": "Adultery",
    "applicationDate": "16 Feb 2018",
    "documents": "2 Docs",
    "lastAction": "16 Feb 2018"
  },

  {
    id: "BV18D00153",
    userID: 1,
    "number": "BV18D00153",
    "parties": "T. Jones vs V. Jones",
    "type": "Divorce",
    "status": "Consider decree nisi",
    "grounds": "Adultery",
    "applicationDate": "16 Feb 2018",
    "documents": "3 Docs",
    "lastAction": "16 Feb 2018"
  },

  {
    id: "BV18D00154",
    userID: 1,
    "number": "BV18D00154",
    "parties": "E. Skinner vs P. Skinner",
    "type": "Financial Remedy",
    "status": "Consider decree nisi",
    "grounds": "Adultery",
    "applicationDate": "16 Feb 2018",
    "documents": "4 Docs",
    "lastAction": "16 Feb 2018"
  },

  {
    id: "654MC345",
    userID: 2,
    "number": "654MC345",
    "parties": "H. Parker vs H. Parker",
    "type": "Civil Money Claims",
    "status": "Small claims",
    "grounds": "Adultery",
    "applicationDate": "16 Feb 2018",
    "documents": "2 Docs",
    "lastAction": "16 Feb 2018"
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