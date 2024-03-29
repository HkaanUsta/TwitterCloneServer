const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    bio: { type: String , required: false},
    profile_picture: { type: String , required: false},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref:"users"  }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref:"users"  }],
    created_at: { type: Date,
         default: Date.now()
        }
});

module.exports = mongoose.model('User', UserSchema)