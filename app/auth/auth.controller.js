app.controller('AuthCtrl', function($scope,$state) {


		$scope.login = function() {
			var provider = new firebase.auth.GoogleAuthProvider();
			  firebase.auth().signInWithPopup(provider);
		};
		// authCtrl.register = function() {
		// 	Auth.$createUser(authCtrl.user).then(function(user) {
		// 		authCtrl.login();
		// 	}, function(error) {
		// 		authCtrl.error = error;
		// 	});
		// };
	});
