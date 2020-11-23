var bcrypt = require("bcryptjs");  // used to hash password value
var mongoose = require("mongoose");
const FACTOR = 10;

var userSchema = mongoose.Schema({
    username:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:false },
    createdAt:{ type:Date, default:Date.now }
});

userSchema.pre("save", function(done) {
    var user = this;

    if(!user.isModified("password")){
        return done();
    }

    bcrypt.genSalt(FACTOR, function(err,salt){
        if(err){return done(err);}
        bcrypt.hash(user.password, salt, function(err, hashedPassword){
            if(err) {return done(err);}
            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done){
      if(this.password != null){
          bcrypt.compare(guess,this.password, function(err, isMatch){
             done(err, isMatch);
          });
      }
}

var User = mongoose.model("User", userSchema);
module.exports = User;