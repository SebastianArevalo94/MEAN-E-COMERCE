const Producto = require("../models/producto");
const Inventario = require("../models/inventario");
const fs = require("fs");
const path = require("path");

const registro_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var data = req.body;
      var img_path = req.files.portada.path;
      var name = img_path.split("\\");
      var portada_name = name[2];
      data.slug = data.titulo
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w]+/g, "");
      data.portada = portada_name;
      let reg = await Producto.create(data);
      let inventario = await Inventario.create({
        admin: req.user.sub,
        cantidad: data.stock,
        proveedor: "Primer Registro",
        producto: reg._id,
      });

      res.status(200).send({ data: reg, inventario: inventario });
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

const listar_productos_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var filtro = req.params["filtro"];
      let reg = await Producto.find({ titulo: new RegExp(filtro, "i") });
      res.status(200).send({ data: reg });
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

const get_portada = async function (req, res) {
  var img = req.params["img"];
  fs.stat(`./uploads/productos/${img}`, function (err) {
    if (!err) {
      let path_img = `./uploads/productos/${img}`;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = `./uploads/default.jpg`;
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const get_producto = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      try {
        let reg = await Producto.findById(req.params["id"]);
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
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

const update_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let id = req.params["id"];
      var data = req.body;
      if (req.files) {
        var img_path = req.files.portada.path;
        var name = img_path.split("\\");
        var portada_name = name[2];

        let reg = await Producto.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            stock: data.stock,
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido,
            portada: portada_name,
          }
        );

        fs.stat(`./uploads/productos/${reg.portada}`, function (err) {
          if (!err) {
            fs.unlink(`./uploads/productos/${reg.portada}`, (err) => {
              if (err) throw err;
            });
          }
        });
        res.status(200).send({ data: reg });
      } else {
        let reg = await Producto.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            stock: data.stock,
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido,
          }
        );
        res.status(200).send({ data: reg });
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

const eliminar_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      await Producto.findByIdAndRemove({ _id: req.params["id"] });
      res.status(200).send({ message: "User has been deleted!" });
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

const listar_inventario_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      try {
        let reg = await Inventario.find({
          producto: req.params["id"],
        }).populate("admin").sort({createdAt:-1});
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
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

const eliminar_inventario_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let reg = await Inventario.findByIdAndRemove({
        _id: req.params["id"],
      });

      let reg_producto = await Producto.findById({ _id: reg.producto });

      let producto = await Producto.findByIdAndUpdate(
        { _id: reg.producto },
        {
          stock: parseInt(reg_producto.stock) - parseInt(reg.cantidad),
        }
      );

      res.status(200).send({ data: producto });
    } else {
      res
        .status(401)
        .send({ message: "You are not allowed to perform this action!" });
    }
  } else {
    res
      .status(401)
      .send({ message: "You are not allowed to perform this action!" });
  }
};

const registro_inventario_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let data = req.body;
      let reg = await Inventario.create(data);
      let reg_producto = await Producto.findById({ _id: reg.producto });
      let producto = await Producto.findByIdAndUpdate(
        { _id: reg.producto },
        {
          stock: parseInt(reg_producto.stock) + parseInt(reg.cantidad),
        }
      );
      res.status(200).send({data:reg})
    } else {
      res
        .status(401)
        .send({ message: "You are not allowed to perform this action!" });
    }
  } else {
    res
      .status(401)
      .send({ message: "You are not allowed to perform this action!" });
  }
};

module.exports = {
  registro_producto_admin,
  listar_productos_admin,
  get_portada,
  get_producto,
  update_producto_admin,
  eliminar_producto_admin,
  listar_inventario_producto_admin,
  eliminar_inventario_producto_admin,
  registro_inventario_producto_admin
};
