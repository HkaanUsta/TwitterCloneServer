const mongoose = require("mongoose");

const FollowsSchema = new mongoose.Schema({
    followers: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    following: { type: mongoose.Schema.Types.ObjectId, ref:"users" },
});

module.exports = mongoose.model('Follows', FollowsSchema)