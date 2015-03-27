'use strict';

var app = angular.module('snackReactorApp');
//refactor to services
app.controller('MainCtrl', function ($scope, $http, $log,$document, ModalService,$location, SearchRestaurants, SharedData) {

  $scope.isLogged = false;
  $scope.selectedValue = 2;
  $scope.showVisting = -2;
  //empty array that will store three random objects.
  //used in our search function to generate results page.

  var arian = {
    username: 'arianf',
    userid: 7397857,
    display: 'Arian Faurtosh'
  };

  var art = {
    username: 'devmeyster',
    userid: 6244629,
    display: 'Art Meyster'
  };

  var users = [arian, art];

  $scope.places = [
    { id: 'gary-danko-san-francisco', name: 'Gary Danko', users: users, rating: 4.5 },
    { id: 'chipotle-san-francisco',   name: 'Chipotle',   users: users, rating: 3   },
    { id: 'mc-donalds-san-francisco', name: 'McDonalds',  users: users, rating: 3.5 },
    { id: 'carl-jr-san-francisco',    name: 'Carl Jr',    users: users, rating: 2.5 },
    { id: 'subway-san-francisco',     name: 'Subway',     users: users, rating: 3.5 }
  ];

  $scope.showGoing = function(num) {
    if($scope.showVisting === num){
      num = -2;
    }
    $scope.showVisting = num;
  };

  $scope.getNumber = function(num) {
    num = Math.floor(num);
    var newArray = new Array(num);
    return newArray;
  };

  $scope.select = function(num){
    if (num === $scope.selectedValue) {
      num = null;
    }
    $scope.showVisting = -2;

    $scope.selectedValue = num;
  };

  $scope.isHalf = function(num) {
    var result = Math.round(num) - Math.floor(num);
    return result;
  };

  $scope.logout = function (){
    $scope.isLogged = !$scope.isLogged;
  };


  $scope.addPlace = function (restaurant){
    console.log($scope);
    var newLoc = {id: restaurant.id, name: restaurant.name, rating: restaurant.rating, image_url: restaurant.image_url};
    // var x = SharedData.get('orgId');

    SearchRestaurants.addLocation(newLoc);
    newLoc.users = ['arianf'];

    $scope.places.push(newLoc);
    $scope.selectedValue = $scope.places.length-1;

    $scope.results = null;

  };

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.search = function(name){

    SearchRestaurants.getRestaurants(name).then(function(response){
      $scope.results = response;
    });
    $scope.restaurant = null;
    // SearchRestaurants.getRestaurants(name).then(function(data){
    //   console.log("Response: ", data);
    // })
  };
});

app.controller('ModalCtrl', function ($scope, $modal, $log, CheckLoggedIn, SharedData, $location) {
  $scope.items = [];
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
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

 CheckLoggedIn().then(function(result){

  if (!result.data){
    $scope.logout();
    $scope.open();
  }
  if(SharedData.get('orgId') === undefined){
    $location.path('/select_org');
  }
 });

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, CheckLoggedIn) {

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
