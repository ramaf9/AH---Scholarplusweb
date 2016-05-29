angular.module('myApp')
	.controller('ChannelsCtrl', function($scope,$state,profile) {
		var channelsCtrl = this;
		channelsCtrl.profile = profile;
		firebase.database().ref('connect').once('value', function(snapshot) {
	        $scope.$apply(function() {
	          		channelsCtrl.channels  = snapshot.val();
					console.log(channelsCtrl.channels)
	        })
		});


		channelsCtrl.getDisplayName = "Testing cyur";//Users.getDisplayName;
		channelsCtrl.getGravatar = "http://google.com";
		channelsCtrl.users = firebase.database().ref('user');
		// Users.setOnline(profile.$id);
		channelsCtrl.logout = function(){
		//   channelsCtrl.profile.online = null;
		//   channelsCtrl.profile.$save().then(function(){
		//     Auth.$unauth();
		//     $state.go('home');
		//   });
		};
		channelsCtrl.newChannel = {
			name: ''
		};
		channelsCtrl.createChannel = function(){
    	var newPostKey = firebase.database().ref('connect').push().set(channelsCtrl.newChannel).then(function(ref){
		  $state.go('channels.messages', {channelId: ref.key()});
		});
		};
	});
