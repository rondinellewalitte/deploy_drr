"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    const userExists = await _User2.default.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await _User2.default.create(req.body);

    return res.json(user);
  }

  async verificarid(req, res) {
    const ultimoid = await _User2.default.findOne({ order: [['id', 'DESC']] });
    if (ultimoid === null) {
      return res
        .status(400)
        .json({ error: 'There is no data in the database' });
    }
    return res.json(ultimoid.id);
  }
}

exports. default = new UserController();
