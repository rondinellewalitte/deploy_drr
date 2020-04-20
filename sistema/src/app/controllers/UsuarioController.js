import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const usuarioExists = await Usuario.findOne({
      where: { email: req.body.email },
    });

    console.log(usuarioExists);

    if (usuarioExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await Usuario.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UsuarioController();
