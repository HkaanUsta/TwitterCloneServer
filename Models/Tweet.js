const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    tweet: { type: String , required:false},
    photos: { type: String , required:false},
    fav : { type: Number },
    retweet_count : { type: Number },
    retweeet_content : { type: mongoose.Schema.Types.ObjectId, ref: "tweets" },
    created_at: { type: Date,
         default: Date.now()
        },
    updated_at : { type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Tweet', TweetSchema)            