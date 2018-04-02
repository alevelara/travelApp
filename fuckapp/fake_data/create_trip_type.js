const tripTypeController = require('../components/tripTypes/tripType.controller');


var createDefaultTripType = function(){
  const tripTypes = [{name:'default1'},
                    {name:'default2'},
                    {name:'default3'}];  
  
    tripTypes.forEach(element => {
        tripTypeController.createTripType(element);        
    });                    

};

createDefaultTripType();