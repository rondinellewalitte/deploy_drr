import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        tipo: Sequelize.INTEGER,
        status: Sequelize.INTEGER,
        curso: Sequelize.INTEGER,
        curso_id: Sequelize.INTEGER,
        ativado: Sequelize.INTEGER,
        id_api: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
