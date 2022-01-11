const express = require('express');
const clienteController = require('../controllers/ClienteController');

const api = express.Router();

api.post('/registro_cliente',clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente);

module.exports = api;