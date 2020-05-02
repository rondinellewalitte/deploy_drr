import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  Form,
  Container,
  Button,
  Jumbotron,
  Badge,
  Image,
} from 'react-bootstrap';

import api from '../../services/api';
import { login } from '../../services/auth';
import './index.css';
import image from '../img/01.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Preencha e-mail e senha para continuar!' });
    } else {
      try {
        const response = await api.post('/sessions', { email, password });
        login(response.data.token);
        this.props.history.push('/');
      } catch (err) {
        this.setState({
          error: 'Dados de Login Errado',
        });
      }
    }
  };

  render() {
    const { error } = this.state;
    return (
      <Container className="container-login">
        <Jumbotron className="background">
          <Form onSubmit={this.handleSignIn}>
            <Form.Group
              controlId="formBasicEmail"
              onChange={(e) => this.setState({ email: e.target.value })}
            >
              <Form.Label>
                <Image src={image} />
              </Form.Label>
              <h6>
                {' '}
                <Badge variant="secondary">Abreviação do Colégio</Badge>
              </h6>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                Não compartilharemos seu email com mais ninguém.
              </Form.Text>
            </Form.Group>
            <Form.Group
              controlId="formBasicPassword"
              onChange={(e) => this.setState({ password: e.target.value })}
            >
              <h6>
                {' '}
                <Badge variant="secondary">Senha</Badge>
              </h6>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {error && <p>{error}</p>}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}

export default withRouter(Login);
