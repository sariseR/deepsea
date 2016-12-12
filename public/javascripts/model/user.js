var User = function(userId) {
  this.userId = userId;
  var userLife = 5;
}

User.prototype.getUserId = function(userId) {
  return this.userId;
}

// class User {
//   User(userId){
//     this.userId = userId;
//     var userLife = 5;
//   }
//
//   getUserId() {
//     return this.userId;
//   }
// }
