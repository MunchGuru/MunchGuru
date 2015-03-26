'use strict';

var app = angular.module('snackReactorApp');
//refactor to services
app.controller('MainCtrl', function ($scope, $http, $log,$document, ModalService,$location, SearchRestaurants, SharedData) {

  $scope.isLogged = false;
  $scope.selectedValue = 2;
  //empty array that will store three random objects.
  //used in our search function to generate results page.
  $scope.places = [
    { id: 'gary-danko-san-francisco', name: 'Gary Danko', users: ['arianf', 'devmeyster', 'rob'],         rating: 4.5 },
    { id: 'chipotle-san-francisco',   name: 'Chipotle',   users: ['knatsuki92', 'ThornWinters'],          rating: 3   },
    { id: 'mc-donalds-san-francisco', name: 'McDonalds',  users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 3.5 },
    { id: 'carl-jr-san-francisco',    name: 'Carl Jr',    users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 2.5 },
    { id: 'subway-san-francisco',     name: 'Subway',     users: ['gistrict9', 'asadsheikh', 'bportnoy'], rating: 3.5 }
  ];


  $scope.getNumber = function(num) {
    num = Math.floor(num);
    var newArray = new Array(num);
    return newArray;
  };

  $scope.select = function(num){
    if (num === $scope.selectedValue) {
      num = null;
    }

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
    var newLoc = {};
    newLoc.id = restaurant.id;
    newLoc.name = restaurant.name;
    newLoc.rating = 4.3;
    var x = SharedData.get('orgId');
    console.log(x);
    SearchRestaurants.addLocation(newLoc);
    $scope.results = null;
  };

  $scope.search = function (name){
    console.log(name);
    // console.log(SearchRestaurants.getRestaurants(name));
    $scope.results = SearchRestaurants.getRestaurants(name);
    $scope.restaurant = null;
    // SearchRestaurants.getRestaurants(name).then(function(data){
    //   console.log("Response: ", data);
    // })
  };
});

app.controller('ModalCtrl', function ($scope, $modal, $log, CheckLoggedIn) {
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
