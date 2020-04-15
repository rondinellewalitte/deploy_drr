import User from '../models/User';

class ListController {
  async listGroupId(req, res) {
    const id = await User.findAll({
      attributes: ['curso'],
      group: ['curso'],
    });
    res.json(id);
  }

  async list(req, res) {
    const listGroup = await User.findAll({ where: { curso: req.body.curso } });
    res.json(listGroup);
  }
}

export default new ListController();
