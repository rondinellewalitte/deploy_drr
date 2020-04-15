"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _utils = require('../../utils'); var _utils2 = _interopRequireDefault(_utils);

class RegisterController {
  async cadastrar(req, res) {
    let verificandoAtivacao = await _User2.default.findOne({ where: { ativado: '0' } });
    let contador = 0;

    if (verificandoAtivacao === null) {
      res.json({ error: 'Nao tem dados para Cadastrar' });
    }

    async function resposta_api(url, params) {
      const respost = await _axios2.default.post(url, params, { headers: _utils2.default });
      return respost;
    }

    while (!verificandoAtivacao.ativado) {
      const params = new URLSearchParams();
      const params_grupo = new URLSearchParams();
      const url_create_user =
        'https://colegiosdanilorrprofessor.com.br/api/1/student';
      const url_add_grupo =
        'https://colegiosdanilorrprofessor.com.br/api/1/groupstudent';

      params.append('email', verificandoAtivacao.email);
      params.append('nome', verificandoAtivacao.name);
      params.append('senha', verificandoAtivacao.password);
      params.append('tipo', verificandoAtivacao.tipo);
      params.append('status', verificandoAtivacao.status);
      params.append('personalizado', verificandoAtivacao.curso);

      const respost = await resposta_api(url_create_user, params);

      params_grupo.append('id', verificandoAtivacao.curso_id);
      params_grupo.append('usuario_id', respost.data.id);

      await resposta_api(url_add_grupo, params_grupo);

      contador += 1;
      await _User2.default.update(
        { ativado: '1', id_api: respost.data.id },
        { where: { id: verificandoAtivacao.id } }
      );

      verificandoAtivacao = await _User2.default.findOne({ where: { ativado: '0' } });

      if (verificandoAtivacao === null) {
        break;
      }

      res.json(respost.data);
    }
    res.json({ message: `OK - Foram cadastrado ${contador}` });
    contador = 0;
  }

  async findgroup(req, res) {
    const respost = await _axios2.default.get(
      'https://colegiosdanilorrprofessor.com.br/api/1/group',
      { headers: _utils2.default }
    );
    res.json(respost.data);
  }
}

exports. default = new RegisterController();
