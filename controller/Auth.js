const model = require("../model/User");
const User = model.User;
const crypto=require("crypto");
const { sanitizerUser } = require("../services/common");

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user=new User({...req.body,password:hashedPassword,salt})
        const doc=await user.save()
        req.login(sanitizerUser(doc),(err)=>{// this also calls serializer and adds to session
          if(err){
            res.status(400).json(err);
          }else{
            res.status(200).json(sanitizerUser(doc));
          }
        })
      }
    );
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  res.json(req.user);
};

exports.checkUser = async (req, res) => {
  res.json({ status: "Success", user: req.user });
};
