import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/style.css';
import { Modal, Button, Nav, Form, InputGroup } from 'react-bootstrap';
import routes from '../../constants';
import { withRouter } from 'react-router-dom';
import CatSearch from '../CatSearch';

class AddItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: -1,
            formGroupName: '',
            formGroupDesc: '',
            formGroupPrice: null,
        };
    }

    selection = (catId) => {
        this.setState({
            selectedCategory: catId,
        });
    }

    renderNotLoggedIn() {
        this.props.history.push('/user');
    }

    renderLoggedIn() {
        return (
            <div>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Item name" value={this.state.formGroupName} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupDesc">
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control type="email" placeholder="Description" value={this.state.formGroupDesc} onChange={e => this.changeValue(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupPrice">
                            <Form.Label>Item Price</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" placeholder="Price" value={this.state.formGroupPrice} onChange={e => this.changeValue(e)} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formGroupCategory">
                            <Form.Label>Item Category</Form.Label>
                            <CatSearch selection={this.selection} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary" onClick={this.submitItem}>Save Item</Button>
                </Modal.Footer>
            </div>
        );
    }

    changeValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitItem = () => {
        let { selectedCategory, formGroupName, formGroupDesc, formGroupPrice } = this.state;
        const data = {
            "name": formGroupName.toString(),
            "description": formGroupDesc.toString(),
            "price": parseInt(formGroupPrice)
        }
        const headers = {
            'Authorization': 'JWT ' + this.props.auth_token,
        }
        axios.post(`http://localhost:5000/categories/${selectedCategory}/items`, data, { headers: headers })
            .then(res => {
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {

        let { auth_token } = this.props;
        console.log(auth_token);
        return (
            <div className="account-container">
                <Modal.Dialog className="user-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>New Item</Modal.Title>
                    </Modal.Header>
                    {
                        auth_token ?
                            this.renderLoggedIn() :
                            this.renderNotLoggedIn()
                    }
                </Modal.Dialog>
            </div>
        );
    }
}

export default withRouter(AddItem);