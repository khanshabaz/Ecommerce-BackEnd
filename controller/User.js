const model = require("../model/User");
const User = model.User;

exports.fetchUserById = async (req, res) => {
  const {id}=req.params
   try {
     const user = await User.findById(id);
     res.status(200).json(user);
   } catch (err) {
     console.error({ err });
     res.status(400).json(err);
   }
 };

exports.loginUser = async (req, res) => {
  try{
  const user = await User.findOne({ email: req.body.email }).exec();
  console.log({ user });
  if (!user) {
    res.status(401).json({ message: "no such user email" });
  } else if (user.password === req.body.password) {
    res
      .status(200)
      .json({
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.addresses,
      });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }}catch(err){
    res.status(400).json(err)
  }
};
