import React, { Component } from 'react';

import Select from 'react-select';

import './index.css';

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
  Image,
} from 'react-bootstrap';

import api from '../../services/api';
import image from '../img/01.png';

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
        <Navbar bg="light" expand="lg">
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
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md={10}>
                <Select
                  placeholder={idGrupo}
                  value={idGrupo}
                  onChange={this.handleInputChange}
                  options={this.grupos()}
                />
              </Col>
              <Col>
                <Button
                  variant="primary"
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Jumbotron>
      </Container>
    );
  }
}
