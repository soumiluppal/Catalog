import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/style.css';
import { Modal, Button, Nav, Form } from 'react-bootstrap';
import routes from '../../constants';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { serverURL } from '../../constants/config';
import jwt_decode from 'jwt-decode';

class NewAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: 'login',
            formGroupUsername: '',
            formGroupName: '',
            formGroupEmail: '',
            formGroupPassword: ''
        };
    }

    renderLogin() {
        return (
            <div>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGroupUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder="Username" value={this.state.formGroupUsername} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.formGroupPassword} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" href={routes.HOME}>Close</Button>
                    <Button variant="primary" onClick={this.onLogin}>Login</Button>
                </Modal.Footer>
            </div>
        );
    }

    renderRegister() {
        return (
            <div>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGroupUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={this.state.formGroupUsername} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={this.state.formGroupEmail} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Full name" value={this.state.formGroupName} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.formGroupPassword} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" href={routes.HOME}>Close</Button>
                    <Button variant="primary" onClick={this.onRegister}>Register</Button>
                </Modal.Footer>
            </div>
        );
    }

    changeValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    changeMode = (eventKey) => {
        this.setState({
            mode: eventKey
        });
    }

    // Function sends post request to backend with registration details

    onRegister = () => {
        let { formGroupUsername, formGroupEmail, formGroupPassword, formGroupName } = this.state;
        let data = {
            "username": formGroupUsername,
            "email": formGroupEmail,
            "name": formGroupName,
            "password": formGroupPassword
        }
        axios.post(`${serverURL}/users`, data)
            .then(res => {
                this.props.getToken(res.data['access_token'], res.data['user_id']);
                this.props.history.goBack();
            })
            .catch(err => {
                alert("Invalid input");
                throw err;
            })
    }

    onLogin = () => {
        let { formGroupUsername, formGroupPassword } = this.state;
        let data = {
            "username": formGroupUsername,
            "password": formGroupPassword
        }
        return axios.post(`${serverURL}/auth`, data)
            .then(res => {
                if (res.data['user_id']) {
                    this.props.getToken(res.data['access_token'], res.data['user_id']);
                }
                else {
                    let decoded = jwt_decode(res.data['access_token']);
                    this.props.getToken(res.data['access_token'], decoded['identity']);
                }
                this.props.history.goBack();
            })
            .catch(err => {
                alert("Wrong username or password.")
                throw err;
            })
    }

    render() {
        if (this.props.user_id && this.props.user_id !== '') {
            this.props.history.push('/');
        }
        return (
            <div className="account-container">
                <Modal.Dialog className="user-modal">
                    <Nav justify variant="tabs" defaultActiveKey="login" onSelect={(eventKey, e) => { this.changeMode(eventKey) }}>
                        <Nav.Item>
                            <Nav.Link eventKey="login" className="tab-nav-link">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="register" className="tab-nav-link">Register</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    {
                        this.state.mode === "login" ?
                            this.renderLogin() :
                            this.renderRegister()
                    }
                </Modal.Dialog>
            </div>
        );
    }
}

NewAccount.propTypes = {
    getToken: PropTypes.func.isRequired,
}

export { NewAccount };
export default withRouter(NewAccount);