var generator = require('generate-password');

exports.generatePassword = function(pw, callback){
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    console.log(password);    
    return callback(password);
};

