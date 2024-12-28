const express = require("express");
const server = express();
const crypto=require("crypto")
const {User} = require("./model/User");
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const authRouter = require("./routes/Auth");
const userRouter = require("./routes/Users");
const cartRouter = require("./routes/Carts");
const orderRouter = require("./routes/Orders");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const session = require("express-session");
const { isAuth, sanitizerUser } = require("./services/common");


const SECRET_KEY="SECRET_KEY"
//JWT Options
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;


//middlewares


server.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

server.use(passport.authenticate('session'));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);



server.use(express.json())
server.use("/products",isAuth, productsRouter.router);
server.use("/brands",isAuth, brandsRouter.router);
server.use("/categories",isAuth,  categoriesRouter.router);
server.use("/auth", authRouter.router);
server.use("/users",isAuth,  userRouter.router);
server.use("/cart", isAuth, cartRouter.router);
server.use("/orders",isAuth,  orderRouter.router);

passport.use(
  "local",
  new LocalStrategy(async function (username, password, done) {
    //by default passport uses username
    try {
      const user = await User.findOne({ email: username });
  
      if (!user) {
        done(null,false,{message:"Invalid Credentials"})//response
      } 
       crypto.pbkdf2(
            password,
            user.salt,
            310000,
            32,
            "sha256",
            async function (err, hashedPassword) {
              if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                return done(null,false,{message:"Invalid Credentials"})//response
              }
              const token=jwt.sign(sanitizerUser(user),SECRET_KEY);
              done(null,token)
            }
          );
    } catch (err) {
      done(err)
    }
  })
);

passport.use("jwt",new JwtStrategy(opts, async function(jwt_payload, done) {
  try{
    const user = await User.findOne({id: jwt_payload.sub});
      if (user) {
          return done(null, sanitizerUser(user));
      } else {
          return done(null, false);
          // or you could create a new account
      }
    }catch(err){
      return done(err,false)
    }
  }))

passport.serializeUser(function(user, cb) {
  console.log("Serialize",user)
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      role:user.role
    });
  });
});

passport.deserializeUser(function(user, cb) {
  console.log("de-Serialize",user)
  process.nextTick(function() {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "Success" });
});


server.listen(3000, () => {
  console.log("Server Started");
});
