angular.module('myApp')
	.factory('Messages', function($firebaseArray, FirebaseUrl,$scope) {
		var channelMessagesRef = firebase.database().ref('channelMessages');
		// var userMessagesRef = firebase.database().ref('userMessages');
		return {
		  forChannel: function(channelId){
			  console.log("CHANEL");
		    channelMessagesRef.once('value', function(snapshot) {
		        $scope.$apply(function() {
		          return snapshot.val();


		        });

		    });
		  },
		  forUsers: function(uid1, uid2){
		    var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

		    // return $firebaseArray(userMessagesRef.child(path));
		  }
		};
	});
