// Login functie voor AWS authorisatie
function signIn(user_email, user_password){

  var poolData = {
    UserPoolId : 'eu-west-2_Sgpc7wwf9',
    ClientId: '3cjvi0u2o3efn73t66t9ashvi2'
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var userData = {
    Username : user_email,
    Pool : userPool
  };

  var authenticationData = {
    Username : user_email,
    Password : user_password
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  console.log("Logging in");

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result){
      console.log("Logged in");
      var idToken = result.getIdToken().getJwtToken();

      AWS.config.region = 'eu-west-2'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'eu-west-2:7434fa1a-36eb-4d43-9e69-a4aa5c898048',
          Logins : {
            'cognito-idp.eu-west-2.amazonaws.com/eu-west-2_Sgpc7wwf9' : idToken
          }
      });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh((error) => {
        if (error) {
          if (debug) { console.error(error); }
        } else {
          var role = result.getIdToken().payload['cognito:groups'][0];
          var name = result.getIdToken().payload['cognito:username'];
          var accessToken = result.getAccessToken().getJwtToken();
          var dict = {name: name, role: role};

          sessionStorage.user_data_vcmap = JSON.stringify(dict);

          loginModal.isActive = false;
        }
      });
    },
    newPasswordRequired: function(userAttributes, requiredAttributes) {
    // User was signed up by an admin and must provide new
    // password and required attributes, if any, to complete
    // authentication.

    // the api doesn't accept this field back
    delete userAttributes.email_verified;

    // unsure about this field, but I don't send this back
    delete userAttributes.phone_number_verified;

    // Get these details and call
    cognitoUser.completeNewPasswordChallenge(user_password, userAttributes, this);
    },
    onFailure: function(err) {
      if (true) { console.log(err.message || JSON.stringify(err)); }
    }
  });
}

Vue.component('login-modal')

// Login modal die omhoog komt als je niet ingelogd bent
var loginTemplate = `
                    <div class="modal" v-bind:class=" {'is-active': isActive }">
                      <div class="modal-background"></div>
                      <form class="modal-card" @submit.prevent="onSubmit" novalidate>
                        <header class="modal-card-head has-text-centered">
                          <p class="is-size-1">VCMAP Dashboard</p>
                        </header>
                        <section class="modal-card-body">
                          <div class="field">
                            <label class="label"> Enter your email </label>
                            <div class="control">
                              <input v-model="email" class="input" type="text" placeholder="Email">
                            </div>
                            <label class="label"> Password </label>
                            <div class="control">
                              <input v-model="password" class="input" type="password" placeholder="Password">
                            </div>
                          </div>
                        </section>
                        <footer class="modal-card-foot">
                          <button class="button" type="submit">Sign in</button>
                        </footer>
                      </form>
                    </div>
                    `;

// Maak de Vue loginModal aan
loginModal = new Vue({
    el: '#Login',
    data: {
      isActive: false,
      email: '',
      password: ''
    },
    template: loginTemplate,
    methods: {
      onSubmit: function(){
        console.log("submitted");
        signIn(loginModal.email, loginModal.password);
      }
    }
  });

// Controleert of gebruiker is ingelogd
if(sessionStorage) {
  user_data_vcmap = JSON.parse(sessionStorage.getItem("user_data_vcmap"));
  if (!(user_data_vcmap == null)) {
    console.log("You were already logged in");
    if (!(user_data_vcmap['name'] == null)) {
      // showAll();
      // showUserInfo(user_data_vcmap);
    } else {
      if (true) { console.log(3); }
    }
  } else {
    loginModal.isActive = true;
  }
} else{
  if (true) { console.log("Sorry, your browser does not support session storage."); }
}
