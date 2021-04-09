const express = require("express");
const router = express.Router();
const multer = require("multer");

//Multer Config 
const fileStorage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null,"./public/img");
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + '---' + file.originalname)
    }
})

const upload = multer({storage: fileStorage})

//Middlewares
const Middlewares = require("../Middlewares/middlawares");

//Function Helpers
const helpers = require("../Functions/helpers")

//Controllers
const UserController = require("../Controllers/UserController");
const TweetController = require("../Controllers/TweetController");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/get_tweet",TweetController.get_tweet);
router.post("/post_tweet", upload.single("file") ,TweetController.post_tweet);
router.get("/get_user", UserController.get_user);
router.post("/follow",UserController.follow)
router.get("/get_tweets/:auth", TweetController.get_tweets);
/*router.post("/:tweet_id",TweetController.edit_tweet_post);
router.get("/:tweet_id",TweetController.edit_tweet_get);*/

module.exports = router;