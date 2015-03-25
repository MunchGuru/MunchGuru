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
  
  var getRestaurants = function (value) {
    return [{
        "display": "Restaurants",
        "api": "restaurants",
        "img_url": "http://media-cdn.tripadvisor.com/media/photo-s/01/f7/51/8d/club-grille-steak-house.jpg"
      },
      {
        "display": "Nightlife",
        "api": "nightlife",
        "img_url": "http://www.deliciouslysortedibiza.com/backgrounds/bg-nightlife.jpg"
      },
      {
        "display": "Active Life",
        "api": "active",
        "img_url": "http://www.canadianwilderness.com/wp-content/uploads/2013/11/ATV-Web.jpeg?222172"
      },
      {
        "display": "Arts & Entertainment",
        "api": "arts",
        "img_url": "http://afri-culture.com/wp-content/uploads/2012/09/arts-entertainment-full-1.jpeg"
      },
      {
        "display": "Beauty & Spas",
        "api": "beautysvc",
        "img_url": "http://85.92.82.55/~thelodg/wp-content/uploads/2010/12/spa.jpg"
      },
      {
        "display": "Hotels & Travel",
        "api": "hotelstravel",
        "img_url": "http://www.cotswolds.info/images/generic/hotels.jpg"
      },
      {
        "display": "Shopping",
        "api": "shopping",
        "img_url": "http://data3.whicdn.com/images/9713691/original.jpg"
      },
      {
        "display": "Local Services",
        "api": "localservices",
        "img_url": "http://bakkersfinedrycleaning.com/wp-content/uploads/2012/09/clean-suits.jpg"
      },
      {
        "display": "Professional Services",
        "api": "professional",
        "img_url": "http://cdn.ownthedollar.com/wp-content/uploads/2009/02/income-tax-return.jpg"
      },
      {
        "display": "Real Estate",
        "api": "realestate",
        "img_url": "http://cdn.cstatic.net/gridnailer/500x/http://cdn.cstatic.net/images/gridfs/541b0cedf92ea112c100c408/5cd2ca6d.building01_color.jpg"
      },
      {
        "display": "Automotive Services",
        "api": "auto",
        "img_url": "http://jparsonsauto.com/wp-content/uploads/2013/03/carmechanic.jpg"
      },
      {
        "display": "Event Planning & Services",
        "api": "eventservices",
        "img_url": "http://voodoocomedy.com/wp-content/uploads/2015/02/MCC.jpg"
      }
    ];
    // return $http({
    //   method: 'GET',
    //   url: 'api/search/'+value,
    // })
    // .then(function (resp) {
    //   return resp.data;
    // });
  };

  var sendVotes = function (vote) {
        console.log(vote);

    return $http({
      method: 'POST',
      url: '/api/sendvote',
      data: { vote: vote }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addLocation = function (org) {
    return $http({
      method: 'POST',
      url: '/api/dailyloc/'+org,
      data: { org: org }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getLocations = function (org) {
    return $http({
      method: 'GET',
      url: 'api/dailyloc/'+org,
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getRestaurants: getRestaurants,
    sendVotes: sendVotes,
    addLocation: addLocation,
    getLocations: getLocations

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