
app.controller('NewsCtrl', function($scope,$modal,$log, ngProgress, toaster,$rootScope) {

$scope.product = {};
var count = 0;
function refresh() {
  var myUserId = firebase.auth().currentUser.uid;
  var listBeasiswa = firebase.database().ref('beasiswa').orderByChild('startdate');
  var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

  var fetchPosts = function(postsRef) {
    postsRef.once('value', function(snapshot) {
        $scope.$apply(function() {
          $scope.products = snapshot.val();
          $scope.product = " ";

        });

    });
  };

  fetchPosts(listBeasiswa);
}

  $scope.animationsEnabled = true;
  $scope.remove = function(product) {
  if(confirm("Are you sure to remove the product")){
      var desertRef = firebase.storage().ref().child('beasiswa/'+product);

          // Delete the file
          desertRef.delete().then(function() {
              console.log("Penghapus file berhasil");

          }).catch(function(error) {
            console.log(error);
            console.log("tidak ada file");
        });

      var remove = firebase.database().ref('beasiswa/'+product).remove();
      console.log(remove);
      refresh();

    }
  };
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      refresh();

    } else {
    }
  });
  $scope.open = function (k,p,size) {
     if ($rootScope.admin) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/admin/newsEdit.html',
          controller: 'newsEditCtrl',
          size: size,
          backdrop:'static',
          resolve: {
            item: function () {
              return p;
          },
            key:function(){
                return k;
            }
          }
        });

        modalInstance.result.then(function (selectedObject) {
          refresh();
          if(selectedObject.save == "insert"){

                }else if(selectedObject.save == "update"){


                }

        }, function () {

          $log.info('Modal dismissed at: ' + new Date());
        });
    }
  };


})

app.controller('newsEditCtrl', function ($scope,key,item, $modalInstance,ngProgress,$rootScope) {

    if ($rootScope.admin) {



            $scope.product = angular.copy(item);
            $scope.bea = $scope.product;
            console.log($scope.bea);
            if ($scope.bea) {
                $scope.bea.id = angular.copy(key);

            }

            $scope.buttonText = (item != null) ? 'Update File' : 'Upload';



            $scope.ok = function (product) {

              ngProgress.start();
                    if(product && product.id){


                        var x = angular.copy(product);
                        console.log(x);
                        x.save = 'update';
                        var newPostKey = product.id;
                        if (typeof product.photopath === 'object') {
                            console.log("upload");
                            var desertRef = firebase.storage().ref().child('news/'+product.id);

                                // Delete the file
                                desertRef.delete().then(function() {
                                    console.log("Penghapus file berhasil");

                                }).catch(function(error) {
                                  console.log(error);
                                })
                                var file = product.photopath;


                                var metadata = {
                                  'contentType': file.type
                                };

                                // Push to child path.
                                var uploadTask = firebase.storage().ref().child('news/'+newPostKey).put(file, metadata);
                                uploadTask.on('state_changed', null, function(error) {
                                  // [START onfailure]
                                  console.error('Upload failed:', error);
                                  // [END onfailure]
                                }, function() {

                                  var url = uploadTask.snapshot.metadata.downloadURLs[0];

                                  // [START_EXCLUDE]
                                  product.photopath = url;



                                firebase.database().ref('news/'+newPostKey).update(product);
                                $modalInstance.close(x);
                            });

                        }
                        else{
                            console.log("gaada file");

                          firebase.database().ref('news/'+newPostKey).update(product);
                           $modalInstance.close(x);
                        }




                    }else{

                            var x = angular.copy(product);
                            x.save = "insert";
                            var file = product.photopath;
                            var newPostKey = firebase.database().ref('news').push().key;

                            var metadata = {
                              'contentType': file.type
                            };

                            // Push to child path.
                            var uploadTask = firebase.storage().ref().child('news/'+newPostKey).put(file, metadata);

                            // Listen for errors and completion of the upload.
                            // [START oncomplete]
                            uploadTask.on('state_changed', null, function(error) {
                              // [START onfailure]
                              console.error('Upload failed:', error);
                              // [END onfailure]
                            }, function() {

                              var url = uploadTask.snapshot.metadata.downloadURLs[0];

                              // [START_EXCLUDE]
                              product.photopath = url;
                            product.likes = {};

                            firebase.database().ref('news/'+newPostKey).set(product);


                             $modalInstance.close(x);
                              // [END_EXCLUDE]
                            });





                    }

            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

    }

  })
  app.controller('NewsDetailCtrl', function($scope,$log,$stateParams,ngProgress, toaster,$rootScope) {
      var id = $stateParams.id;
      function refresh() {
        var listBeasiswa = firebase.database().ref('news/'+id);

        var fetchPosts = function(postsRef) {
          postsRef.once('value', function(snapshot) {
              $scope.$apply(function() {
                $scope.product = snapshot.val();


              });

          });
        };

        fetchPosts(listBeasiswa);
      }
      refresh();
  })
