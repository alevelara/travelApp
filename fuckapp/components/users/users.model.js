//Modules
var crypto = require('crypto'),
    mongoose = require('mongoose');
    env_var = require('../../config/var.json'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String, 
        required:  false
    },
    photo_profile_id:{
        type:Schema.Types.ObjectId,
        ref: 'Photo',
        required: false
    },
    phone_number:{
        type: Number,
        required: false
    },
    followers:[{
        type: Schema.Types.ObjectId, 
        ref:'User',
        required: false
    }],

    followings:[{
        type: Schema.Types.ObjectId, 
        ref:'User',
        required: false
    }],
    score:{
        type: Number,
        default: 0,
        required: false
    },
     
    reviews_in: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Message',        
        required: false
    }],
    reviews_out: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Message',        
        required: false
    }],
    user_type:{
       type: Number, 
       required: false,
       default: 0
    },
    rating:{ 
        type: Schema.Types.ObjectId,
        ref: 'Ratio',        
        required: false
    },
    description: {
        type: String,
        required: true
    },

    // Selected Interests by user
    interests: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Interest',        
        required: false
    }],
   
    features: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Feature',        
        required: false
    }],

    languajes: [{ 
        type: String,        
        required: false
    }],

    hometown:{ 
        type: Schema.Types.ObjectId,
        ref: 'City',        
        required: false
    },
    
    reset_password_token:{
        type: String, 
        required: false
    },
    date_log:{
        type: Date,
        default: Date.now
    },
    hash: String,
    salt: String

});

userSchema.methods.setPassword = function(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
  return this.hash === hash;
};

userSchema.methods.setInterests = function(interests){
   this.interests = interests;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, env_var.development.JWT_KEY); 
};




module.exports = mongoose.model('User',userSchema);

