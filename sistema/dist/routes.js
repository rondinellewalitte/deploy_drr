"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _RegisterController = require('./app/controllers/RegisterController'); var _RegisterController2 = _interopRequireDefault(_RegisterController);
var _ListController = require('./app/controllers/ListController'); var _ListController2 = _interopRequireDefault(_ListController);

const routes = new (0, _express.Router)();

routes.post('/users', _UserController2.default.store);
routes.get('/id', _UserController2.default.verificarid);
routes.post('/list', _ListController2.default.list);
routes.get('/listGroupId', _ListController2.default.listGroupId);
routes.get('/cadastrar', _RegisterController2.default.cadastrar);
routes.get('/grupos', _RegisterController2.default.findgroup);

exports. default = routes;
