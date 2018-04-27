var users = [

  {
    id: 1,
    name: 'Martin Smith',
    role: 'Legal Adviser',
    juristictions: [{
      id: 1,
      name: 'Divorce'
    }]
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