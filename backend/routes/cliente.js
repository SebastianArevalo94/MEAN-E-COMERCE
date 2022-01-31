const express = require('express');
const clienteController = require('../controllers/ClienteController');
const auth = require('../middlewares/authenticate')
const api = express.Router();

api.post('/registro_cliente',clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente);
api.get('/get_clientes/:tipo/:filtro?',auth.auth,clienteController.get_clientes);
api.post('/registro_cliente_admin',auth.auth,clienteController.registro_cliente_admin);
api.get('/get_cliente/:id',auth.auth,clienteController.get_cliente)
api.put('/actualizar_cliente_admin/:id',auth.auth,clienteController.actualizar_cliente_admin);
api.delete('/eliminar_cliente_admin/:id',auth.auth,clienteController.eliminar_cliente_admin);

module.exports = api;