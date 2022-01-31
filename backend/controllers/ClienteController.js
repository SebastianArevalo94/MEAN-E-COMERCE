const Cliente = require("../models/cliente");
const bcrypt = require("bcrypt");
const jwt = require("../helpers/jwt");

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
  if (userDB.length != 0) {
    //Login
    let user = userDB[0];
    bcrypt.compare(data.password, user.password, async function (error, check) {
      if (check) {
        res
          .status(200)
          .send({ message: "User logged !", token: jwt.createToken(user) });
      } else {
        res.status(400).send({ message: "Incorrect Password !" });
      }
    });
  } else {
    res.status(400).send({ message: "user does not exist!" });
  }
};

const get_clientes = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let tipo = req.params["tipo"];
      let filtro = req.params["filtro"];
      if (tipo == null || tipo == "null") {
        const reg = await Cliente.find();
        res.status(200).send({ data: reg });
      } else {
        if (tipo == "apellidos") {
          let reg = await Cliente.find({ apellidos: new RegExp(filtro, "i") });
          res.status(200).send({ data: reg });
        } else if (tipo == "correos") {
          let reg = await Cliente.find({ email: new RegExp(filtro, "i") });
          res.status(200).send({ data: reg });
        }
      }
    } else {
      res
        .status(500)
        .send({ message: "You are not allowed to perform this action!" });
    }
  } else {
    res
      .status(500)
      .send({ message: "You are not allowed to perform this action!" });
  }
};

const registro_cliente_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var data = req.body;
      var password = "123456789";
      bcrypt.hash(password, 10, async function (err, hash) {
        if (hash) {
          data.password = hash;
          let reg = await Cliente.create(data);
          res.status(200).send({ data: reg });
        } else {
          res.status(500).send({ message: "Internal server error" });
        }
      });
    } else {
      res
        .status(500)
        .send({ message: "You are not allowed to perform this action!" });
    }
  } else {
    res
      .status(500)
      .send({ message: "You are not allowed to perform this action!" });
  }
};

const get_cliente = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      try {
        let reg = await Cliente.findById(req.params['id']);
        res.status(200).send({data:reg});
      } catch (error) {
        res.status(200).send({data:undefined});
      }
    } else {
      res
        .status(500)
        .send({ message: "You are not allowed to perform this action!" });
    }
  } else {
    res
      .status(500)
      .send({ message: "You are not allowed to perform this action!" });
  }
};

const actualizar_cliente_admin = async function(req,res){
  if (req.user) {
    if (req.user.role == "admin") {
      const { nombres, apellidos, email, telefono, f_nacimiento , dni, genero} = req.body;
      let reg = await Cliente.findByIdAndUpdate({_id:req.params['id']},{
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        telefono: telefono,
        f_nacimiento: f_nacimiento,
        dni: dni,
        genero: genero
      });
      res.status(200).send({data:reg});
    } else {
      res
        .status(500)
        .send({ message: "You are not allowed to perform this action!" });
    }
  } else {
    res
      .status(500)
      .send({ message: "You are not allowed to perform this action!" });
  }
}

const eliminar_cliente_admin = async function(req,res){
  if (req.user) {
    if (req.user.role == "admin") {
      await Cliente.findByIdAndRemove({_id:req.params['id']});
      res.status(200).send({message:'User has been deleted!'});
    } else {
      res
        .status(500)
        .send({ message: "You are not allowed to perform this action!" });
    }
  } else {
    res
      .status(500)
      .send({ message: "You are not allowed to perform this action!" });
  }
}


module.exports = {
  registro_cliente,
  login_cliente,
  get_clientes,
  registro_cliente_admin,
  get_cliente,
  actualizar_cliente_admin,
  eliminar_cliente_admin
};
