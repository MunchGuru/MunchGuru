'use strict';

var app = angular.module('snackReactorApp');
//refactor to services

app.controller('SelectOrgCtrl', function ($scope, $modal, $log, CheckLoggedIn, OrgSelect, SharedData, $location) {
  $scope.items = [];

  $scope.githubOrgs = [];
  
  OrgSelect.getGithubOrgs().then(function(result){
    // console.log(result);
    $scope.githubOrgs = result.data.orgs;
    $scope.githubOrgs.forEach(function(org){
      org.submitting = false;
    });
  });

  $scope.selectOrg = function(orgId, orgLogin, repeatScope){
    repeatScope.org.submitting = true;
    // OrgSelect.setGithubOrg(orgId, orgLogin, $location, $state);
    // $modalInstance.close();
    // $modalInstance.dismiss('cancel');
    SharedData.set('orgId', orgId);
    SharedData.set('orgLogin', orgLogin);
    console.log(orgId, orgLogin);
    $location.path('/');
    // ;//ideally we'll figure out how to close that fucking modal

  };

  //Upon clicking the 'Search' button:
    //Check the current session to see if user is logged in
      //If not logged in, open the modal, and authenticate via GitHub button.
        //redirect to results page
      //If logged in, submit a post request with priceClicked & healthClicked values specified
        //redirect to results page.

  // $scope.open = function (size) {
  //   var modalInstance = $modal.open({
  //     templateUrl: '1.html',
  //     controller: '2Ctrl',
  //     size: size,
  //     backdrop: true,
  //     resolve: {
  //       items: function () {
  //         return $scope.items;
  //       }
  //     }
  //   });
  //   modalInstance.result.then(function (selectedItem) {
  //     $scope.selected = selectedItem;
  //   });
  // };

  // $scope.open('md');

});
app.controller('2Ctrl', function ($scope, $modalInstance, items, OrgSelect, $location, $state) {

  $scope.githubOrgs = [];
  
  OrgSelect.getGithubOrgs().then(function(result){
    // console.log(result);
    $scope.githubOrgs = result.data.orgs;
    $scope.githubOrgs.forEach(function(org){
      org.submitting = false;
    });

  });

  $scope.selectOrg = function(orgId, orgLogin, repeatScope){
    repeatScope.org.submitting = true;
    // OrgSelect.setGithubOrg(orgId, orgLogin, $location, $state);
    // $modalInstance.close();
    // $modalInstance.dismiss('cancel');
    $location.path('/');
    // $location.path('/').
    $modalInstance.close();
    $modalInstance.close();
    $modalInstance.dismiss('cancel');
    $modalInstance.dismiss('cancel');

    $modalInstance.close();
    $modalInstance.dismiss('cancel');
    $modalInstance.dismiss('cancel');
    // ;//ideally we'll figure out how to close that fucking modal

  };
 
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
