var users = [

  {
    id: 1,
    name: 'Martin Smith',
    role: 'Legal Adviser',
    juristictions: [
      {
        id: 1,
        name: 'Divorce'
      },
      {
        id: 2,
        name: 'Financial Remedy'
      },
      {
        id: 3,
        name: 'Civil Money Claims'
      }
    ]
  },

  {
    id: 2,
    name: 'Jeremy Bennett',
    role: 'Judge'
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

exports.getUser = function(id) {
  return users.filter(user => user.id == id)[0];
};