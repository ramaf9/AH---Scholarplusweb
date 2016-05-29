angular.module('myApp')
	.controller('MessagesCtrl', function(profile, channelId,$scope) {
		var messagesCtrl = this;
		var channelMessagesRef = firebase.database().ref('connect-comments');
		channelMessagesRef.once('value', function(snapshot) {
				messagesCtrl.messages = snapshot.val();


			})
		firebase.database().ref('connect/'+channelId).once('value', function(snapshot) {
			var name = snapshot.val().name
		messagesCtrl.channelName = '#'+name;
			})

		messagesCtrl.message = '';
		messagesCtrl.sendMessage = function (){
					  if(messagesCtrl.message.length > 0){
			var newPostKey = channelMessagesRef.push().set({
		      uid: "123",
		      body: messagesCtrl.message
		    }).then(function(ref){
					messagesCtrl.message = '';
			});

		  }
		};
	});
