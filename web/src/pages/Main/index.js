import React, { Component } from 'react';
import Select from 'react-select';

import 'bootstrap/dist/css/bootstrap.min.css';

import SweetAlert from 'react-bootstrap-sweetalert';

import { MdSystemUpdateAlt } from 'react-icons/all';
import {
  Jumbotron,
  Form,
  Container,
  Button,
  Navbar,
  Nav,
} from 'react-bootstrap';

import api from '../../services/api';

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
    api
      .get('/grupos')
      .then((response) => {
        this.setState({
          grupos: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
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
    var i;
    var idid;
    e.preventDefault();

    const { idGrupo, newEscola, newNomes, newEstado, grupos } = this.state;

    const result = grupos.find((fruit) => fruit.grupo_id === idGrupo);
    console.log(result.grupo_nome);

    const removeSpace = newNomes.trim();
    const arrayNomes = removeSpace.split(';');

    const lastId = await api.get('/id').catch((error) => {
      console.log(error);
    });

    if (lastId === undefined) {
      idid = 1;
    } else {
      idid = lastId.data + 1;
    }

    for (i = 0; i < arrayNomes.length; i += 1) {
      const ob = {
        name: arrayNomes[i],
        email: `${newEstado}${newEscola}${idid}@drr.com`,
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
          console.log(error);
        });

      idid += 1;
    }

    const getAlert = () => (
      <SweetAlert success title="Sucesso" onConfirm={() => this.hideAlert()}>
        Cadastro realizado com sucesso
      </SweetAlert>
    );

    await api
      .get('/cadastrar')
      .then((response) => {
        this.setState({
          alert: getAlert(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  grupos() {
    const { grupos } = this.state;
    return grupos.map((data) => ({
      label: data.grupo_nome,
      value: data.grupo_id,
    }));
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null,
    });
  }

  render() {
    const { idGrupo, newEscola, newNomes, newEstado, alert } = this.state;
    return (
      <Container className="p-4" variant="light">
        <style type="text/css">
          {`
            .btn-flat {
              background-color: #7159c1;
              color: white;
            }
            .nvb-collor {
              background-color: #569fb8;
            }
          `}
        </style>
        <Navbar variant="light" expand="lg">
          <Navbar.Brand href="#home">DRR Aulas Online</Navbar.Brand>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Button variant="flat" href="/">
                Matriculas
              </Button>
              <p>&nbsp;&nbsp;</p>
              <Button variant="flat" href="/repository">
                Listar
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Jumbotron>
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
              <Form.Label>Prefixo do Colegio</Form.Label>
              <Form.Control placeholder="Ex: CPMG, CEMI" required />
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                value={newEstado}
                onChange={this.handleInputChange1}
                required
              >
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Label>Grupo</Form.Label>
              <Select
                value={idGrupo}
                onChange={this.handleInputChange3}
                options={this.grupos()}
                placeholder="Selecione o Grupo"
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Nomes dos Alunos</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Joao;Maria;Eduardo"
                value={newNomes}
                onChange={this.handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="flat" type="submit" size="lg">
              Enviar
            </Button>
            {alert}
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}
