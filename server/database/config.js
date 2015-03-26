var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    // Change for production
    host: '127.0.0.1',
    // user: 'fearless_soup',
    // password: 'password',
    // database: 'snackreactordb',
    charset: 'utf8',
    filename: path.join(__dirname, './snackreactordb.sqlite')
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.integer('organization_id').references('id').inTable('organizations');
      user.string('email').unique();
      user.string('username').unique();
      user.string('password');
      user.integer('is_admin', 1);
      user.string('access_token');
      user.string('refresh_token');
      user.string('auth_type');
      user.string('auth_id');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('organizations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('organizations', function (organization) {
      organization.increments('id').primary();
      organization.string('name');
      organization.string('address');
      organization.string('place_id');
      organization.string('github_id');
      organization.json('github_profile');
      organization.float('location_lat');
      organization.float('location_long');
      organization.string('domain');
      organization.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/*
{
      "is_claimed": true,
      "rating": 4.5,
      "mobile_url": "http://m.yelp.com/biz/william-cross-wine-merchants-and-wine-bar-san-francisco",
      "rating_img_url": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png",
      "review_count": 82,
      "name": "William Cross Wine Merchants & Wine Bar",
      "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/y4IJ7r0s1ITmbs6Htu3j9w/ms.jpg",
      "rating_img_url_small": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png",
      "url": "http://www.yelp.com/biz/william-cross-wine-merchants-and-wine-bar-san-francisco",
      "phone": "4153461314",
      "snippet_text": "This place is amazing! I must have walked past it over 100 times without knowing there was a wine bar tucked in the back.  The concept is brilliant: there...",
      "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/CpUFCWuHHNS6SSxR7qIG6g/ms.jpg",
      "categories": [
        [
          "Beer, Wine & Spirits",
          "beer_and_wine"
        ]
      ],
      "display_phone": "+1-415-346-1314",
      "rating_img_url_large": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png",
      "id": "william-cross-wine-merchants-and-wine-bar-san-francisco",
      "is_closed": false,
      "location": {
        "cross_streets": "Bonita St & Green St",
        "city": "San Francisco",
        "display_address": [
          "2253 Polk St",
          "Russian Hill",
          "San Francisco, CA 94109"
        ],
        "geo_accuracy": 8,
        "neighborhoods": [
          "Russian Hill"
        ],
        "postal_code": "94109",
        "country_code": "US",
        "address": [
          "2253 Polk St"
        ],
        "coordinate": {
          "latitude": 37.7975998,
          "longitude": -122.4223709
        },
        "state_code": "CA"
      }
    }
*/

// New table for restaurants table that gets refreshed daily.
// This should be populated via yelp info.
db.knex.schema.hasTable('restaurantsDaily').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('restaurantsDaily', function (restaurant) {
      restaurant.increments('id').primary();
      restaurant.string('name');
      restaurant.string('yelpId');
      restaurant.string('url');
      restaurant.string('phone');
      restaurant.string('rating_img_url');
      restaurant.json('location');
      restaurant.json('coordinate');
      restaurant.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('organizations_restaurantsDaily').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('organizations_restaurantsDaily', function (org) {
      org.increments('id').primary();
      org.integer('organization_id').references('id').inTable('organizations').index();
      org.integer('restaurantDaily_id').references('id').inTable('restaurantsDaily').index();
      org.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('votesDaily').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('votesDaily', function (vote) {
      vote.increments('id').primary();
      vote.integer('user_id').references('id').inTable('users').index();
      vote.integer('organization_id').references('id').inTable('organizations').index();
      vote.integer('restaurantDaily_id').references('id').inTable('restaurantsDaily').index();
      vote.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////

db.knex.schema.hasTable('restaurants').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('restaurants', function (restaurant) {
      restaurant.increments('id').primary();
      restaurant.string('name');
      restaurant.integer('price', 1);
      restaurant.integer('health', 1);
      restaurant.string('hours').references('id').inTable('hours');
      restaurant.string('address');
      restaurant.float('location_lat');
      restaurant.float('location_long');
      restaurant.string('phone_number');
      restaurant.string('place_id');
      restaurant.string('photo_url');
      restaurant.text('description');
      restaurant.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('ratings').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('ratings', function (rating) {
      rating.increments('id').primary();
      rating.integer('rating', 1);
      rating.integer('user_id').references('id').inTable('users');
      rating.integer('restaurant_id').references('id').inTable('restaurants');
      rating.integer('organization_id').references('id').inTable('organizations');
      rating.integer('has_visited', 1);
      rating.text('comment');
      rating.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


db.knex.schema.hasTable('organizations_restaurants').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('organizations_restaurants', function (org) {
      org.increments('id').primary();
      org.integer('organization_id').references('id').inTable('organizations').index();
      org.integer('restaurant_id').references('id').inTable('restaurants').index();
      org.float('avg_rating');
      org.text('description');
      org.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});





db.knex.schema.hasTable('hours').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('hours', function (hour) {
      hour.increments('id').primary();
      hour.integer('restaurant_id').references('id').inTable('restaurants').index();
      hour.integer('day');
      hour.time('open');
      hour.time('close');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function (session) {
      session.integer('id').primary();
      session.string('sid').unique();
      session.string('data');
      session.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;



