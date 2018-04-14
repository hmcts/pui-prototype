var users = [

  {
    id: 1,
    "name": "Martin Smith",
    "role": "Legal Adviser",
    "cases": [
      {
        "number": "BV18D00150",
        "parties": "D. Francis vs S. Francis",
        "type": "Divorce",
        "status": "Consider decree nisi",
        "applicationDate": "16 Feb 2018",
        "documents": "6 Docs",
        "lastAction": "16 Feb 2018"
      },
      {
        "number": "BV18D00151",
        "caseParties": "W. Sutton vs F. Sutton",
        "caseType": "Financial Remedy",
        "caseStatus": "Draft concent order",
        "caseApplicationDate": "16 Feb 2018",
        "documents": "2 Docs",
        "caseLastAction": "16 Feb 2018"
      },
      {
        "number": "BV18D00152",
        "caseParties": "R. Miller vs D. Miller",
        "caseType": "Financial Remedy",
        "caseStatus": "Draft concent order",
        "caseApplicationDate": "16 Feb 2018",
        "documents": "2 Docs",
        "caseLastAction": "16 Feb 2018"
      },
      {
        "number": "BV18D00153",
        "caseParties": "T. Jones vs V. Jones",
        "caseType": "Divorce",
        "caseStatus": "Consider decree nisi",
        "caseApplicationDate": "16 Feb 2018",
        "documents": "3 Docs",
        "caseLastAction": "16 Feb 2018"
      },
      {
        "number": "BV18D00154",
        "caseParties": "E. Skinner vs P. Skinner",
        "caseType": "Financial Remedy",
        "caseStatus": "Consider decree nisi",
        "caseApplicationDate": "16 Feb 2018",
        "documents": "4 Docs",
        "caseLastAction": "16 Feb 2018"
      },
      {
        "number": "654MC345",
        "caseParties": "H. Parker vs H. Parker",
        "caseType": "Civil Money Claims",
        "caseStatus": "Small claims",
        "caseApplicationDate": "16 Feb 2018",
        "documents": "2 Docs",
        "caseLastAction": "16 Feb 2018"
      },
      {
        "number": "654MC346",
        "caseParties": "L. Baker vs S. Baker",
        "caseType": "Civil Money Claims",
        "caseStatus": "Multi track",
        "caseApplicationDate": "16 Feb 2018",
        "documents": "2 Docs",
        "caseLastAction": "16 Feb 2018"
      }
    ]
  }

];

exports.getUsersEntries = function() {
  return users;
};

exports.getUsersEntry = function(id) {
  for(var i=0; i < users.length; i++) {
    if(users[i].id == id) return users[i];
  }
};