import React, { Component } from 'react';
import Select from 'react-select';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

import SweetAlert from 'react-bootstrap-sweetalert';

import { MdSystemUpdateAlt } from 'react-icons/all';
import {
  Jumbotron,
  Form,
  Container,
  Button,
  Navbar,
  Nav,
  Image,
  Badge,
} from 'react-bootstrap';

import api from '../../services/api';
import image from '../img/01.png';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNomes: '',
      newEstado: '',
      newEscola: '',
      idGrupo: null,
      grupos: [],
      alert: null,
    };
  }

  componentDidMount() {
    const RespostAPI = () => (
      <SweetAlert error title="Erro" onConfirm={() => this.hideAlert()}>
        Erro ao conectar com a Base de Dados
      </SweetAlert>
    );
    api
      .get('/grupos')
      .then((response) => {
        this.setState({
          grupos: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          alert: RespostAPI(),
        });
      });
  }

  handleInputChange = (e) => {
    this.setState({ newNomes: e.target.value });
  };

  handleInputChange1 = (e) => {
    this.setState({ newEstado: e.target.value });
  };

  handleInputChange2 = (e) => {
    this.setState({ newEscola: e.target.value });
  };

  handleInputChange3 = (e) => {
    this.setState({ idGrupo: e.value });
  };

  handleSubmit = async (e) => {
    const { idGrupo, newEscola, newNomes, newEstado, grupos } = this.state;

    const getAlert = () => (
      <SweetAlert success title="Sucesso" onConfirm={() => this.hideAlert()}>
        Cadastro realizado com sucesso
      </SweetAlert>
    );
    const getAlerterror = () => (
      <SweetAlert error title="Erro" onConfirm={() => this.hideAlert()}>
        O Campo <font color="red">Grupo</font> não pode ser em Branco!
      </SweetAlert>
    );
    const RespostAPI = (message) => (
      <SweetAlert error title="Erro" onConfirm={() => this.hideAlert()}>
        {message}
      </SweetAlert>
    );

    let idid;
    e.preventDefault();

    if (idGrupo === null) {
      this.setState({
        alert: getAlerterror(),
      });
      return null;
    }
    const result = grupos.find((grupo) => grupo.grupo_nome === idGrupo);

    const removetable = newNomes.replace(/(\r\n|\n|\r)/gm, ';');
    const removeSpace = removetable.trim();
    const filtered = removeSpace.split(';');
    const arrayNomes = filtered.filter(Boolean);

    const lastId = await api.get('/id').catch((error) => {
      console.log(error);
    });

    if (lastId === undefined) {
      idid = 1;
    } else {
      idid = lastId.data + 1;
    }
    arrayNomes.forEach(async (nome) => {
      const ob = {
        name: nome,
        email: `${newEstado}${newEscola}${idid++}@drr.com`,
        password: '123',
        tipo: 0,
        status: 1,
        curso: result.grupo_nome,
        curso_id: result.grupo_id,
        ativado: 0,
      };

      await api
        .post('/users', ob)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.setState({
            alert: RespostAPI(error.response.data.message.error),
          });
        });
    });

    await api
      .get('/cadastrar')
      .then((response) => {
        console.log(response);
        this.setState({
          alert: getAlert(),
        });
      })
      .catch((error) => {
        console.log(error.response.data.message.error);
        this.setState({
          alert: RespostAPI(error.response.data.message.error),
        });
      });
  };

  grupos() {
    const { grupos } = this.state;
    return grupos.map((data) => ({
      label: data.grupo_nome,
      value: data.grupo_nome,
    }));
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  render() {
    const { idGrupo, newEscola, newNomes, newEstado, alert } = this.state;

    return (
      <Container className="p-4" variant="light">
        <Navbar className="background" expand="lg">
          <Navbar.Brand>
            <Image src={image} />
          </Navbar.Brand>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Button variant="primary" href="/">
                Matriculas
              </Button>
              <p>&nbsp;&nbsp;</p>
              <Button variant="primary" href="/repository">
                Listar
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Jumbotron className="background">
          <h2 className="header">
            <MdSystemUpdateAlt />
            Criação de Matrículas
          </h2>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group
              controlId="formGridAddress2"
              value={newEscola}
              onChange={this.handleInputChange2}
            >
              <h6>
                {' '}
                <Badge variant="secondary">Abreviação do Colégio :</Badge>
              </h6>
              <Form.Control placeholder="Ex: CPMG, CEMI" required />
            </Form.Group>
            <Form.Group controlId="formGridState">
              <h6>
                {' '}
                <Badge variant="secondary">Estado :</Badge>
              </h6>
              <Form.Control
                as="select"
                value={newEstado}
                onChange={this.handleInputChange1}
                required
              >
                <option value="">Selecione Uma Opção</option>
                <option value="ac">Acre</option>
                <option value="al">Alagoas</option>
                <option value="ap">Amapá</option>
                <option value="am">Amazonas</option>
                <option value="ba">Bahia</option>
                <option value="ce">Ceará</option>
                <option value="df">Distrito Federal</option>
                <option value="es">Espírito Santo</option>
                <option value="go">Goiás</option>
                <option value="ma">Maranhão</option>
                <option value="mt">Mato Grosso</option>
                <option value="ms">Mato Grosso do Sul</option>
                <option value="mg">Minas Gerais</option>
                <option value="pa">Pará</option>
                <option value="pb">Paraíba</option>
                <option value="pr">Paraná</option>
                <option value="pe">Pernambuco</option>
                <option value="pi">Piauí</option>
                <option value="rj">Rio de Janeiro</option>
                <option value="rn">Rio Grande do Norte</option>
                <option value="rs">Rio Grande do Sul</option>
                <option value="ro">Rondônia</option>
                <option value="rr">Roraima</option>
                <option value="sc">Santa Catarina</option>
                <option value="sp">São Paulo</option>
                <option value="se">Sergipe</option>
                <option value="to">Tocantins</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
              <h6>
                {' '}
                <Badge variant="secondary">Grupo :</Badge>
              </h6>
              <Select
                value={idGrupo}
                onChange={this.handleInputChange3}
                options={this.grupos()}
                placeholder={idGrupo}
                isSearchable
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <h6>
                {' '}
                <Badge variant="secondary">Lista de Alunos :</Badge>
              </h6>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Ex:&#10;Joao da Silva&#10;Maria Aparecida da Costa"
                value={newNomes}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
              Enviar
            </Button>
            {alert}
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}
