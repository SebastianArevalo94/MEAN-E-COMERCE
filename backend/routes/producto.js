const express = require('express');
const productoController = require('../controllers/ProductoController');
const auth = require('../middlewares/authenticate')
const api = express.Router();
const multiparty = require('connect-multiparty');
const path = multiparty({uploadDir:'./uploads/productos'})

//Productos
api.post('/registro_producto_admin',[auth.auth,path],productoController.registro_producto_admin);
api.get('/listar_productos_admin/:filtro?',auth.auth,productoController.listar_productos_admin);
api.get('/get_portada/:img',productoController.get_portada);
api.get('/get_producto/:id',auth.auth,productoController.get_producto);
api.put('/update_producto_admin/:id',[auth.auth,path],productoController.update_producto_admin);
api.delete('/eliminar_producto_admin/:id',auth.auth,productoController.eliminar_producto_admin);

//Inventario
api.get('/listar_inventario_producto_admin/:id',auth.auth,productoController.listar_inventario_producto_admin);
api.delete('/eliminar_inventario_producto_admin/:id',auth.auth,productoController.eliminar_inventario_producto_admin);
api.post('/registro_inventario_producto_admin',auth.auth,productoController.registro_inventario_producto_admin);

module.exports = api;