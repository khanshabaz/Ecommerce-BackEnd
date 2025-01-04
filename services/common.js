const passport = require("passport");
const nodemailer = require("nodemailer");
exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizerUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmZkYmE3OGNkN2JiMzRkOGQ0NGNlNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM1ODI1MDU1fQ.yRI1Rp3WvNzBkse7hjk6_zPWcN2H8zqZSnOtEIi3P_8";
  return token;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "khan.shabaz@skillvertex.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.sendMail = async ({to,subject,text,html}) => {

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Ecommerce 👻" <khan.shabaz@skillvertex.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

 return info
};
