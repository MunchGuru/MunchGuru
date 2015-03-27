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

db.knex.schema.hasTable('locations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('locations', function (location) {
      location.increments('id').primary();
      location.string('name');
      location.string('yelp_id');
      location.double('rating');
      location.text('imgUrl');
      location.integer('organization_id');
      location.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('votes').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('votes', function (vote) {
      vote.increments('id').primary();
      vote.text('user_info'); //Note: this isn't related to the user table
      vote.integer('organization_id');
      vote.integer('location_id').references('id').inTable('location').index();
      vote.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;



