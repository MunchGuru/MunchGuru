// var GoogleLocations = require('google-locations');
var Promise = require('bluebird');
// var locations = new GoogleLocations(process.env.GOOGLE_PLACES_API_KEY);
// Promise.promisifyAll(locations);


exports.getDetails = function(placeID) {
  // return locations.detailsAsync({placeid: placeID})
  //         .then(function(response){
  //           if (response.status !== 'OK') console.error('Error getting details for place ID: ' + placeID);
  //           return response.result;
  //         });
return {};
};

exports.getDetailsFromAddressAndName = function(address, name, distance) {
  distance = distance || 1600;
  // return locations.searchByAddressAsync(
  //         {address: address, name: name, radius: 1600, rankby: 'prominence', maxResults: 3})
  //         // {address: address, name: name})
  //         .then(function(response){
  //           for (var i = 0; i < response.errors.length; i++){
  //             console.error('Error looking up place details: ' + response.errors[i]);
  //           }
  //           return response.details;
  //         });
return {};
};

exports.geocodeAddress = function(address){
  // return locations.geocodeAddressAsync({address: address})
  // .then(function(result,err){
    // if (err) console.error('Error fetching geocode: ' + err);
    // console.log(result.results[0]);
    // return [result.results[0].geometry.location.lat,result.results[0].geometry.location.lng, result.results[0].place_id];
  // });
  return [0, 0, 0];
};


//takes Google Places' four digit time format and adjusts to MySQL time format
var parseTime = function(time){
  if (typeof time !== 'string') console.error('Invalid time format.');
  else {
    return time.substring(0,2) + ':' + time.substring(2,4) + ':00';
  }
}

//accepts an opening_hours object from a Google Places details request, and returns an array of arrays.
//Each subarray represents a period of time the location is open, in the following format:
//period[0] is the day of the week, where 0 is Sunday and 6 is Saturday
//period[1] is the time the period begins (the business opens)
//period[2] is the time the period ends (the business closes)
//times are formatted for a MySQL time column, i.e. 'HH:MM:SS'.

module.exports.parseHours = function(opening_hours){
  var periods = opening_hours.periods;
  var result = [];
  for (var i = 0; i < periods.length; i++){
    //initialize variable for each period of opening
    var period = [];
    if(!periods[i].close){ //if a venue is always open on a day, there will be no close field
      period[0] = periods[i].open.day;
      period[1] = '00:00:01';
      period[2] = '23:59:59';
    } else {
      period[0] = periods[i].open.day;
      period[1] = parseTime(periods[i].open.time);
      period[2] = parseTime(periods[i].close.time);
    }
    result.push(period);
  }
  return result;
}
