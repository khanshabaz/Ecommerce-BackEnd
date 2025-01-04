const model = require("../model/User");
const User = model.User;
const crypto = require("crypto");
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const { sanitizerUser, cookieExtractor, sendMail } = require("../services/common");
const SECRET_KEY="SECRET_KEY"
//JWT Options
const opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

const jwt=require("jsonwebtoken")


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
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(sanitizerUser(doc), (err) => {
          // this also calls serializer and adds to session
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizerUser(doc), SECRET_KEY);
            res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).json({id:doc.id,role:doc.role});

          }
        });
      }
    );
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  res
  .cookie('jwt', req.user.token, {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
  })
  .status(201)
  .json(req.user.token);
};

exports.checkAuth= async (req, res) => {
 if(req.user){
  res.json(req.user);
 }else{
  res.sendStatus(401)
 }
};

exports.reserPasswordRequest= async (req, res) => {
  const resetPage="http://localhost:5173/reset-password"//Reset Password Component link
  const subject="reset password for e-commerce"
  const html=`<p>Click <a href='${resetPage}'>here</a> to Reset Password`
  if(req.body.email){
    const response=await sendMail({to:req.body.email,subject,html})
   res.send(response);
  }else{
   res.sendStatus(401)
  }
 };
 