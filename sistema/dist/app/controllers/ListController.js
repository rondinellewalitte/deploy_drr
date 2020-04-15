"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class ListController {
  async listGroupId(req, res) {
    const id = await _User2.default.findAll({
      attributes: ['curso'],
      group: ['curso'],
    });
    res.json(id);
  }

  async list(req, res) {
    const listGroup = await _User2.default.findAll({ where: { curso: req.body.curso } });
    res.json(listGroup);
  }
}

exports. default = new ListController();
