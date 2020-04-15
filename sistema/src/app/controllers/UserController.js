import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }

  async verificarid(req, res) {
    const ultimoid = await User.findOne({ order: [['id', 'DESC']] });
    if (ultimoid === null) {
      return res
        .status(400)
        .json({ error: 'There is no data in the database' });
    }
    return res.json(ultimoid.id);
  }
}

export default new UserController();
