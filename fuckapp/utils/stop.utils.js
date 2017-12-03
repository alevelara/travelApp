//Modules
var https = require('https');
//

//Vars

 var googleVars = require('../config/google-places.json'), 
     googleBasicRequestUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + googleVars.development.GOOGLE_KEY; //+ "&location=" + vars.development.location + "&radius=" + vars.development.radius+ "&types=" + vars.development.types ; //+ "&sensor=" + sensor + "+ "&keyword=" + keyword;   

exports.getStopsByLocation = function(location, callback){
    var url = googleBasicRequestUrl + "&location=" + location + "&radius=" + googleVars.development.radius + "&types=" + googleVars.development.optionals.types;
    console.log(url);
    https.get(url, function(response) {
      var body ='';
      response.on('data', function(chunk) {
        body += chunk;
        });    
    response.on('end', function() {
        var places = JSON.parse(body);        
        callback(places.results);
      });

    }).on('error', function(e) {
      console.log("Got error: " + e.message);
      callback(e.message);
  });

}
