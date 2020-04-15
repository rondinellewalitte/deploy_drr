"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        password: _sequelize2.default.STRING,
        tipo: _sequelize2.default.INTEGER,
        status: _sequelize2.default.INTEGER,
        curso: _sequelize2.default.INTEGER,
        curso_id: _sequelize2.default.INTEGER,
        ativado: _sequelize2.default.INTEGER,
        id_api: _sequelize2.default.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

exports. default = User;
