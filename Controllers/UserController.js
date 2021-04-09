//Models
const User = require("../Models/User");

//Require
const bcrypt = require('bcrypt');
const saltRounds = 12;


exports.login = (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    User.findOne({email},(error,user)=>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    res.json({auth:true,message:"Kullanıcı bilgileri doğru.",user:user})
                }else{
                    res.json({auth:false,message:"Kullanıcı şifresi yanlış girilmiştir. Lütfen kontrol ediniz..."})
                }
            });
        }else{
            res.json({auth:false, message:"Girilen verilerle eşleşen kullanıcı bulunamadı. Lütfen bilgileri kontrol edip tekrar deneyiniz..."})
        }
    })
}

exports.register = (req,res)=>{
    const {email, password, firstName, lastName } = req.body
    bcrypt.hash(password, saltRounds, function(err,hash){
        User.create({
            first_name : firstName,
            last_name: lastName,
            email: email,
            password: hash
        }).then((result)=>{
            if(result){
                res.json({message:"Hesabınız başarıyla oluşturulmuştur. Artık giriş yapabilirsiniz."})
            }else{ 
                res.json({message:"Kayıt yapılırken bir hata ile karşılaştık. Lütfen tekrar deneyiniz."})
            }
        })
    })
}

exports.get_user = (req,res)=>{
    User.find().then((user)=>{
        res.send(user);
    })
}

exports.follow = (req,res)=>{
    const id = req.body.id
    const auth = req.body.auth
    User.findByIdAndUpdate({_id: id}, {$push: { followers: auth._id }}).then((user)=>{
        User.findByIdAndUpdate({_id: auth._id},{ $push: { following: user._id} }).then(()=>{
            res.send("Başarıyla takip edildi")
        })
    })
}