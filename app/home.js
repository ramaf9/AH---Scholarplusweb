app.controller('HomeCtrl', function ($scope,$rootScope) {
    function writeUserData(userId, name, email) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
      });
      $rootScope.admin = true;
    }



    // var signInButton = document.getElementById('sign-in-button');
    // signInButton.addEventListener('click', function() {
    //   var provider = new firebase.auth.GoogleAuthProvider();
    //   firebase.auth().signInWithPopup(provider);
    //
    //
    //
    // });
    //
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     writeUserData(user.uid, user.displayName, user.email);
    //     startDatabaseQueries();
    //
    //   } else {
    //   }
    // });

})
