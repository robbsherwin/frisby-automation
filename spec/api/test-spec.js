var frisby= require('frisby');
var baseUrl = 'www.basewebsite.com/';
var baseApiUrl = 'api/';
var loginState = {
};

var user = 'user@gmail.com';
var password = 'passw0rd';
var userToDelete = 'dd17a3d0-a7bb-11e6-80f5-76304dec7eb7';

// First, let's login. We'll then place our delete in the .afterJSON of our initial login.
frisby.create('Login to test site') 
  //.auth(user, password)  // If you need to specify a user and password, do that with .auth
  // In this example, we are including the email and password as payload to login.
  .post('http://' + baseUrl + baseApiUrl + 'login/', {
    
      "email": user,
      "password": password
   })
  .expectStatus(200)
  .inspectRequest()
  .inspectJSON()
  .inspectHeaders()
  .afterJSON(function(response) { // This is an example of using a Bearer token. 
    frisby.create('Delete user')
    .delete('http://' + baseUrl + baseApiUrl + 'users/' + userToDelete)
    .addHeader('Authorization', 'Bearer ' + response.token)
    .inspectRequest()  
    .expectStatus(200)
    .toss(); 
  })
.toss(); // This .toss runs the whole thing. When we inspect our JSON up above we can see everything returned, in case you don't use a Bearer token.
