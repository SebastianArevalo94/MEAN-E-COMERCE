const Cliente = require("../models/cliente");
const bcrypt = require("bcrypt");
const jwt = require('../helpers/jwt')

const registro_cliente = async function (req, res) {
  const data = req.body;
  let user = [];
  user = await Cliente.find({ email: data.email });
  if (user.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, 10, async function (err, hash) {
        data.password = hash;
        const reg = await Cliente.create(data);
        res.status(200).send({ user: reg });
      });
    } else {
      res.status(400).send({ message: "400 Bad request, no password." });
    }
  } else {
    res.status(400).send({ message: "Error, user already exist!" });
  }
};
const login_cliente = async function (req, res) {
  const data = req.body;
  let userDB = {};
  userDB = await Cliente.find({ email: data.email });
  if (userDB.length!=0) {
    //Login
    let user = userDB[0];
    bcrypt.compare(data.password, user.password, async function (error, check) {
      if (check) {
        res.status(200).send({ message: "User logged !", token:jwt.createToken(user) });
      } else {
        res.status(400).send({ message: "Incorrect Password !" });
      }
    });
  } else {
    res.status(400).send({message:"user does not exist!"})
  }
};

module.exports = {
  registro_cliente,
  login_cliente
};
