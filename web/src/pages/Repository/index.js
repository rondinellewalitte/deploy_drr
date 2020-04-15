import React, { Component } from 'react';

import Select from 'react-select';

import {
  Jumbotron,
  Row,
  Col,
  Form,
  Container,
  Button,
  Table,
  Navbar,
  Nav,
} from 'react-bootstrap';

import api from '../../services/api';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idGrupo: null,
      grupos: [],
      cursos: [],
    };
  }

  componentDidMount() {
    api.get('/listGroupId').then((response) => {
      this.setState({
        grupos: response.data,
      });
    });
  }

  handleInputChange = (e) => {
    this.setState({ idGrupo: e.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { idGrupo } = this.state;
    const dados = { curso: idGrupo };
    const response = await api.post('/list', dados);
    this.setState({ cursos: response.data });
  };

  grupos() {
    const { grupos } = this.state;
    return grupos.map((data) => ({
      label: data.curso,
      value: data.curso,
    }));
  }

  render() {
    const { idGrupo, cursos } = this.state;
    return (
      <Container className="p-4">
        <style type="text/css">
          {`
            .btn-flat {
              background-color: #7159c1;
              color: white;
            }

          `}
        </style>
        <Navbar bg="light" expand="lg">
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
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={10}>
                <Select
                  placeholder="Buscar grupo"
                  value={idGrupo}
                  onChange={this.handleInputChange}
                  options={this.grupos()}
                />
              </Col>
              <Col>
                <Button
                  variant="flat"
                  type="submit"
                  size="sm"
                  block
                  style={{ height: '38px' }}
                >
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
          <Table responsive>
            <thead>
              <tr>
                <th>Nome Completo do Aluno</th>
                <th>Email</th>
                <th>Senha</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Jumbotron>
      </Container>
    );
  }
}
