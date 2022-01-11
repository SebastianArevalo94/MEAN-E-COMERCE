const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require('../helpers/jwt')

const registro_admin = async function (req, res) {
  const data = req.body;
  let adminDB = [];
  adminDB = await Admin.find({ email: data.email });
  if (adminDB.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, 10, async function (err, hash) {
        data.password = hash;
        const reg = await Admin.create(data);
        res.status(200).send({message:'Admin created!' ,user: reg });
      });
    } else {
      res.status(400).send({ message: "400 Bad request, no password." });
    }
  } else {
    res.status(400).send({ message: "Error, admin already exist!" });
  }
};

const login_admin = async function (req, res) {
  const data = req.body;
  let adminDB = [];
  adminDB = await Admin.find({ email: data.email });
  if (adminDB.length!=0) {
    //Login
    let admin = adminDB[0];
    bcrypt.compare(data.password, admin.password, async function (error, check) {
      if (check) {
        res.status(200).send({ message: "Admin logged !", token:jwt.createToken(admin)});
      } else {
        res.status(400).send({ message: "Incorrect Password !" });
      }
    });
  } else {
    res.status(400).send({message:"admin does not exist!"})
  }
};

module.exports = {
    registro_admin,
    login_admin
};
