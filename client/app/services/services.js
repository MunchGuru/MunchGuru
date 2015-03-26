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
    return {
        'region': {
          'span': {
            'latitude_delta': 0.15268098999999324,
            'longitude_delta': 0.11678680578179979
          },
          'center': {
            'latitude': 37.799835849999994,
            'longitude': -122.446273388281
          }
        },
        'total': 40,
        'businesses': [
          {
            'is_claimed': true,
            'rating': 4.5,
            'mobile_url': 'http://m.yelp.com/biz/cafe-rx-san-francisco',
            'rating_img_url': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
            'review_count': 27,
            'name': 'Cafe RX',
            'snippet_image_url': 'http://s3-media1.fl.yelpcdn.com/photo/MnF0nPYh3w7LvKsGsjLYwg/ms.jpg',
            'rating_img_url_small': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
            'url': 'http://www.yelp.com/biz/cafe-rx-san-francisco',
            'phone': '4155612273',
            'snippet_text': 'GO HERE & YOU WON"T REGRET IT (;\n\nmy roommate and I were able to stumble upon this cute place, due to the fact that we were both hungry and we were up by...',
            'image_url': 'http://s3-media1.fl.yelpcdn.com/bphoto/OWavhUDsBoQCUF1Uv_P4oQ/ms.jpg',
            'categories': [
              [
                'Breakfast & Brunch',
                'breakfast_brunch'
              ],
              [
                'Sandwiches',
                'sandwiches'
              ],
              [
                'Cafes',
                'cafes'
              ]
            ],
            'display_phone': '+1-415-561-2273',
            'rating_img_url_large': 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
            'id': 'cafe-rx-san-francisco',
            'is_closed': false,
            'location': {
              'city': 'San Francisco',
              'display_address': [
                'Thoreau Center in the Presidio',
                '1013 Torney Ave',
                'Presidio',
                'San Francisco, CA 94129'
              ],
              'geo_accuracy': 8,
              'neighborhoods': [
                'Presidio'
              ],
              'postal_code': '94129',
              'country_code': 'US',
              'address': [
                'Thoreau Center in the Presidio',
                '1013 Torney Ave'
              ],
              'coordinate': {
                'latitude': 37.7998600155115,
                'longitude': -122.451773285866
              },
              'state_code': 'CA'
            }
          },
          {
            'is_claimed': true,
            'rating': 4.5,
            'mobile_url': 'http://m.yelp.com/biz/cafe-me-san-francisco-2',
            'rating_img_url': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
            'review_count': 169,
            'name': 'Cafe Me',
            'snippet_image_url': 'http://s3-media3.fl.yelpcdn.com/photo/qU0Ey_uDaX6OcBzsTUj91A/ms.jpg',
            'rating_img_url_small': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
            'url': 'http://www.yelp.com/biz/cafe-me-san-francisco-2',
            'phone': '4152888628',
            'snippet_text': 'Arguably the best breakfast sandwich in SF.\n\nService is fast and friendly, food tastes great, priced right, what more could you ask for?  I could eat there...',
            'image_url': 'http://s3-media4.fl.yelpcdn.com/bphoto/qhBjMbtsV4D70p_wn-gqEA/ms.jpg',
            'categories': [
              [
                'Breakfast & Brunch',
                'breakfast_brunch'
              ],
              [
                'Coffee & Tea',
                'coffee'
              ],
              [
                'Sandwiches',
                'sandwiches'
              ]
            ],
            'display_phone': '+1-415-288-8628',
            'rating_img_url_large': 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
            'id': 'cafe-me-san-francisco-2',
            'is_closed': false,
            'location': {
              'cross_streets': 'Sansome St & Hotaling St',
              'city': 'San Francisco',
              'display_address': [
                '500 Washington St',
                'Financial District',
                'San Francisco, CA 94111'
              ],
              'geo_accuracy': 9.5,
              'neighborhoods': [
                'Financial District'
              ],
              'postal_code': '94111',
              'country_code': 'US',
              'address': [
                '500 Washington St'
              ],
              'coordinate': {
                'latitude': 37.7959978128965,
                'longitude': -122.402058961065
              },
              'state_code': 'CA'
            }
          },
          {
            'is_claimed': true,
            'rating': 4.5,
            'mobile_url': 'http://m.yelp.com/biz/cafe-st-jorge-san-francisco',
            'rating_img_url': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
            'review_count': 160,
            'name': 'Cafe St. Jorge',
            'snippet_image_url': 'http://s3-media1.fl.yelpcdn.com/photo/7mHAcbwVP_ZEvX2I74HNFw/ms.jpg',
            'rating_img_url_small': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
            'url': 'http://www.yelp.com/biz/cafe-st-jorge-san-francisco',
            'menu_date_updated': 1416477451,
            'phone': '4158142028',
            'snippet_text': 'I love their coffee, always just right!\n\nI found this place when i lived in Bernal, and i still come here to work and have quiet time. try their menu, food...',
            'image_url': 'http://s3-media2.fl.yelpcdn.com/bphoto/BXIstyFf-qzdP4IbCS2-9A/ms.jpg',
            'categories': [
              [
                'Breakfast & Brunch',
                'breakfast_brunch'
              ],
              [
                'Coffee & Tea',
                'coffee'
              ]
            ],
            'display_phone': '+1-415-814-2028',
            'rating_img_url_large': 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
            'menu_provider': 'single_platform',
            'id': 'cafe-st-jorge-san-francisco',
            'is_closed': false,
            'location': {
              'cross_streets': 'Cortland Ave & Kingston St',
              'city': 'San Francisco',
              'display_address': [
                '3438 Mission St',
                'Bernal Heights',
                'San Francisco, CA 94110'
              ],
              'geo_accuracy': 9.5,
              'neighborhoods': [
                'Bernal Heights',
                'Mission'
              ],
              'postal_code': '94110',
              'country_code': 'US',
              'address': [
                '3438 Mission St'
              ],
              'coordinate': {
                'latitude': 37.741612083577,
                'longitude': -122.422536600206
              },
              'state_code': 'CA'
            }
          },
          {
            'is_claimed': true,
            'rating': 4.5,
            'mobile_url': 'http://m.yelp.com/biz/mission-public-san-francisco',
            'rating_img_url': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
            'review_count': 73,
            'name': 'Mission Public',
            'snippet_image_url': 'http://s3-media2.fl.yelpcdn.com/photo/PVsN3GXGm0cu_AwBrYq5cw/ms.jpg',
            'rating_img_url_small': 'http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
            'url': 'http://www.yelp.com/biz/mission-public-san-francisco',
            'menu_date_updated': 1401865075,
            'phone': '4155254175',
            'snippet_text': 'Great community space filled with chill people, local artwork, and delicious snacks. From the sandwiches to the homemade poptarts, there are great times to...',
            'image_url': 'http://s3-media2.fl.yelpcdn.com/bphoto/e_dGzBIaNEYssFpaYTmVvQ/ms.jpg',
            'categories': [
              [
                'Breakfast & Brunch',
                'breakfast_brunch'
              ],
              [
                'Cafes',
                'cafes'
              ]
            ],
            'display_phone': '+1-415-525-4175',
            'rating_img_url_large': 'http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
            'menu_provider': 'single_platform',
            'id': 'mission-public-san-francisco',
            'is_closed': false,
            'location': {
              'cross_streets': 'Natoma St & Minna St',
              'city': 'San Francisco',
              'display_address': [
                '233 14th St',
                'Mission',
                'San Francisco, CA 94103'
              ],
              'geo_accuracy': 9.5,
              'neighborhoods': [
                'Mission'
              ],
              'postal_code': '94103',
              'country_code': 'US',
              'address': [
                '233 14th St'
              ],
              'coordinate': {
                'latitude': 37.768286,
                'longitude': -122.4186664
              },
              'state_code': 'CA'
            }
          }
        ]
      };

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

  var addLocation = function (restaurant) {
    console.log(restaurant);
    return $http({
      method: 'POST',
      url: '/api/dailyloc/',
      data: { restaurant: restaurant }
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
  var instance = {};
  
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
    });
  };

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
  };

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
  };

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