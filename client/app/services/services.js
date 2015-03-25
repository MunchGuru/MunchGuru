'use strict';

angular.module('snackReactor-services',[])

.factory('CheckLoggedIn', ['$http', function($http){
  return function(){

    return $http.post('/auth/checkloggedin')
    .success(function(data, status, headers, config){
      return true;
    })
    .error(function(data, status, headers, config){
      return false;
    });
  };
}])

.factory('SearchRestaurants', ['$http', '$location', function($http, $location){
  
  var get = function (name) {
    return $http({
      method: 'GET',
      url: 'http://yelpvisualization.azurewebsites.net/api/restaurant/'+name,
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var add = function (url) {
        console.log(url);

    return $http({
      method: 'POST',
      url: '/api/links',
      data: { url: url }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    get: get,
    add: add
  };

}])

.factory('SharedData', function(){ // a little function to share data between states

  var storage = {};

  var set = function(key,value){
    storage[key] = value;
  };

  var get = function(key){
    return storage[key];
  };

  return {set: set, get: get};

})

.factory('OrgSelect', ['$http', function($http, $location){
  var instance = {}
  
  instance.getGithubOrgs = function(){
    return $http.get('/user/getorgs/github')
    .success(function(data, status, headers, config){
      return data.orgs;
    })
    .error(function(data,status,headers,config){
      console.error('Error fetching Github organizations: ' + data);
    });
  };

  instance.setGithubOrg = function(orgId, orgLogin, $location, $state){
    return $http.post('/user/setorg/github', {orgId: orgId})
    .success(function(data,status,headers,config){
      if (data.create){
        $location.path('/org/create').search({github_id: orgId, github_login: orgLogin}); //send them to the create flow, preserving github org name
      }
      else {
        $location.path('/');
        window.location.reload();
      }
    })
    .error(function(data,status,headers,config){
      console.error('Error posting org: ' + data);
    })
  }

  instance.getGithubOrgInfo = function(login, token){

    return $http.get('https://api.github.com/orgs/' + login, {
      headers: {
        'Authorization': 'token ' + token
      }
    })
    .success(function(data,status,headers,config){
        return data;
    })
    .error(function(data,status,headers,config){
        console.error('Error getting organization info from Github ' + data);
      });

  };

  instance.getAccessToken = function(){
    return $http.get('/user/token')
    .success(function(data, status, headers, config){
      return data.access_token;
    })
    .error(function(data, status, headers, config){
      console.error('Error getting Github authorization ' + data);
    });
  };

  instance.createOrg = function(github_id, address, name, github_login, placeId){
    placeId = placeId || null;
    return $http.post('/org/create/github', {
      github_id: github_id,
      address: address,
      name: name,
      github_login: github_login,
      placeId: placeId
    });
  }

  return instance;

}])

.factory('CreateRestaurant', ['$http', function($http){
    
    return function(name, address, health, price, description, rating){
      return $http.post('/api/restaurants/new', {
        name: name,
        address: address,
        health: health,
        price: price,
        description: description,
        rating: rating
      });
    }

}])

.factory('GetRating', ['$http', function($http){
  return function(id){
    return $http.post('/api/restaurants/getrating', {id: id});
  };
}])

.factory('SendRating', ['$http', function($http){
  return function(id, rating){
    id = parseInt(id);
    rating = parseInt(rating);
    return $http.post('/api/restaurants/rating', {id: id, rating: rating});
  };

}]);