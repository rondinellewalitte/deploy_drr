import axios from 'axios';

import User from '../models/User';
import headers from '../../utils';

class RegisterStudentsontroller {
  async register_students(req, res) {
    const checking_database_activation = await User.findAll({
      where: { ativado: '0' },
    });

    async function EAD_api_registration(url, params) {
      const respost = await axios.post(url, params, { headers });
      return respost;
    }
    const url_create_user =
      'https://colegiosdanilorrprofessor.com.br/api/1/student01';
    const url_add_grupo =
      'https://colegiosdanilorrprofessor.com.br/api/1/groupstudent01';

    if (!checking_database_activation.length) {
      return res.status(400).json({ error: 'has no students to register' });
    }

    checking_database_activation.forEach(async students => {
      const params = new URLSearchParams();
      const params_grupo = new URLSearchParams();

      params.append('email', students.email);
      params.append('nome', students.name);
      params.append('senha', students.password);
      params.append('tipo', students.tipo);
      params.append('status', students.status);
      params.append('personalizado', students.curso);

      const api_respost = await EAD_api_registration(url_create_user, params);

      if (api_respost.data.id === undefined) {
        return res.status(400).json({ message: api_respost.data });
      }

      params_grupo.append('id', students.curso_id);
      params_grupo.append('usuario_id', api_respost.data.id);

      const api_respost_grupo = await EAD_api_registration(
        url_add_grupo,
        params
      );

      if (api_respost_grupo.data.id === undefined) {
        return res.status(400).json({ message: api_respost_grupo.data });
      }

      await User.update(
        { ativado: '1', id_api: api_respost.data.id },
        { where: { id: students.id } }
      );
      return res.json({ message: 'Successful enrollment' });
    });
    return console.log('Successful enrollment');
  }

  async findgroup(req, res) {
    const respost = await axios.get(
      'https://colegiosdanilorrprofessor.com.br/api/1/group',
      { headers }
    );
    res.json(respost.data);
  }
}

export default new RegisterStudentsontroller();
