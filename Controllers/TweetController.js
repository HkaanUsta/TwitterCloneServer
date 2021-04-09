// Models
const User = require("../Models/User");
const Tweet = require("../Models/Tweet");

// requires
const faker = require("faker");

exports.get_tweet = (req,res)=>{
    // Setting getting without auth_id
    Tweet.find().then((tweets)=>{
        res.status(200).send(tweets)
    })
}
/*

exports.edit_tweet_get = (req,res)=>{
    const editing_tweet = req.params.tweet_id
    // Then change this to session storage 
    Tweet.findOne({_id : editing_tweet, user: auth}).then((tweet)=>{
        res.send(tweet)
    })
}

exports.edit_tweet_post = (req,res)=>{
    const editing_tweet = req.params.tweet_id
    // Then change this to session storage
    const update_tweet = req.body.update
    Tweet.findOne({_id : editing_tweet, user: auth}, { tweet: update_tweet }).then((tweet)=>{
        res.send(tweet)
    })
}*/

exports.post_tweet = (req,res)=>{
    const tweet_content = req.body.content;
    const tweet_user = req.body.user;
    const photos = req.file;
    if(!photos){
        Tweet.create({
            user: tweet_user,
            tweet: tweet_content,
            fav: 0,
            retweet_count : 0,
        }).then(()=>{
            res.send("Başarıyla tweetiniz atılmıştır. Lütfen daha fazla tweet atmayı unutmayınız...")
        })
    }else{
        const photos_name = req.file.filename
        if(!tweet_content){
            Tweet.create({
                user: tweet_user,
                photos: photos_name,
                fav: 0,
                retweet_count : 0,
            }).then(()=>{
                res.send("Başarıyla tweetiniz atılmıştır. Lütfen daha fazla tweet atmayı unutmayınız...")
            })
        }else{
            Tweet.create({
                user: tweet_user,
                tweet: tweet_content,
                photos: photos_name,
                fav: 0,
                retweet_count : 0,
                }).then(()=>{
                res.send("Başarıyla tweetiniz atılmıştır. Lütfen daha fazla tweet atmayı unutmayınız...")
            })
        }
    }
}

exports.get_tweets = (req,res)=>{
    const auth = req.params.auth
    const tweets = []
    User.findById(auth).then((user)=>{
        user.following.forEach(element => {
            Tweet.find({user: element}).then((tweet)=>{
                tweets.push(tweet)
            })
        })
    })
}