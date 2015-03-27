var app = angular.module('snackReactorApp')

app.controller('ResultsCtrl', function ($scope,CheckLoggedIn, $location, SearchRestaurants, $state, SharedData, SendRating, GetRating) {

  //have to run checked in on each controller
  $scope.checkLogged = function () {
    CheckLoggedIn().then(function(result){
      if(!result.data){
        $location.path("/");
      }
    });
  };

  $scope.restaurants = [
    { id: 'gary-danko-san-francisco', name: 'Gary Danko', users: ['arianf', 'devmeyster', 'rob'],         rating: 4.5, photo_url:"http://www.hothangups.com/p7lsm_img_1/thumbs/GaryDanko_tmb.jpg" },
    { id: 'chipotle-san-francisco',   name: 'Chipotle',   users: ['knatsuki92', 'ThornWinters'],          rating: 3,   photo_url:"http://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/1024px-Chipotle_Mexican_Grill_logo.svg.png" },
    { id: 'mc-donalds-san-francisco', name: 'McDonalds',  users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 3.5, photo_url:"http://img1.wikia.nocookie.net/__cb20100717060808/logopedia/images/a/a9/Mcdonalds-90s-logo.svg" },
    { id: 'carl-jr-san-francisco',    name: 'Carl Jr',    users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 2.5, photo_url:"https://fastfoodmenuprice.com/wp-content/uploads/2014/11/carls.jpeg"},
    { id: 'subway-san-francisco',     name: 'Subway',     users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 3.5, photo_url:"http://fontmeme.com/images/Subway-Logo.jpg" }
  ];
  
  $scope.dislike = function (restaurant){
    console.log("disliked", restaurant);
    $scope.restaurants.shift();
  };
  $scope.like = function (restaurant){
    console.log("disliked", restaurant);
    if($scope.restaurants.length-1 === 0){
      alert("no more restaurants in the queue");
    }
    $scope.restaurants.shift();
  };

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.addPlace = function (restaurant){
    console.log($scope);
    var newLoc = {};
    newLoc.id = restaurant.id;
    newLoc.name = restaurant.name;
    newLoc.rating = 4.3;
    console.log(newLoc);
    SearchRestaurants.addLocation(newLoc);
    $scope.results = null;
  };

  $scope.oneAtATime = true;
  
  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  //---------

  $scope.sendRating = function(id, rating){
    SendRating(id, rating);
  };

  $scope.reshuffle = function () {

    //ideally, this should just call another request to the server 
    SearchRestaurants(SharedData.get('health'), SharedData.get('price'))
    .success(function(data, status, headers, config){
      $scope.restaurants = data;
    });

  // $state.reload(); //is this necessary?

  };

});


app.controller('AddModal', function ($scope, $modal, $log, CheckLoggedIn) {
  $scope.items = [];

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'restaurant.html',
      controller: 'FormCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };

});

app.controller('FormCtrl', function ($scope, $modalInstance, items, CheckLoggedIn) {

   $scope.test = function (something) {
    console.log(something);
  }

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});