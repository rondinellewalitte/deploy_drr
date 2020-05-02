import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from 'react-select';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';

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
  Badge,
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
      .get('/listGroupId')
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

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  render() {
    const { idGrupo, cursos, alert } = this.state;
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
          <PrintProvider>
            <NoPrint>
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
              <Print>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        <h6>
                          {' '}
                          <Badge variant="secondary">
                            Nome Completo do Aluno
                          </Badge>
                        </h6>
                      </th>
                      <th>
                        {' '}
                        <h6>
                          <Badge variant="secondary">Email</Badge>
                        </h6>
                      </th>
                      <th>
                        {' '}
                        <h6>
                          <Badge variant="secondary">Senha</Badge>
                        </h6>
                      </th>
                      <th>
                        {' '}
                        <h6>
                          <Badge variant="secondary">Status no Sistema</Badge>
                        </h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cursos.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.status ? 'Ativado' : 'Não Ativado'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Print>
              {alert}
            </NoPrint>
          </PrintProvider>
        </Jumbotron>
      </Container>
    );
  }
}
