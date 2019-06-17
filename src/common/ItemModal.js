import React, { Component } from 'react';
import axios from 'axios';
import '../styles/style.css';
import { Modal, InputGroup, Form, Button } from 'react-bootstrap';
import CatSearch from '../components/CatSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeModal } from '../actions/modal.action';
import { serverURL } from '../constants/config';


function mapStateToProps(state) {
    return {
        auth_token: state.catReducer.auth_token,
        user_id: state.catReducer.user_id,
        showModal: state.modalReducer.showModal,
        item: state.modalReducer.item,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ closeModal }, dispatch);
}

// Modal displaying item details and edit options
class ItemModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formGroupName: '',
            formGroupDesc: '',
            formGroupPrice: null,
            editMode: false
        };
    }

    renderViewMode = () => {
        let { item, user_id } = this.props;
        return (
            <div>
                <Modal.Body>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onClose}>Close</Button>
                    {
                        item.user_id === user_id ?
                            <div>
                                <Button className="edit-mode-btn" variant="primary" onClick={this.onEditMode}>Edit</Button>
                                <Button className="edit-mode-btn" variant="danger" onClick={this.onDelete}>Delete</Button>
                            </div> : null
                    }
                </Modal.Footer>
            </div>
        );
    }

    renderEditMode = () => {
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onClose}>Close</Button>
                    <Button variant="primary" onClick={this.onEditSubmit}>Save Item</Button>
                </Modal.Footer>
            </div>
        );
    }

    changeValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onClose = () => {
        this.setState({
            editMode: false
        });
        this.props.closeModal();
    }

    onEditMode = () => {
        let { item } = this.props;
        this.setState({
            editMode: true,
            formGroupName: item.name,
            formGroupDesc: item.description,
            formGroupPrice: item.price,
        });
    }

    onDelete = () => {
        let { item, auth_token, categoryId } = this.props;

        const headers = {
            'Authorization': 'JWT ' + auth_token,
        }
        axios.delete(`${serverURL}/categories/${categoryId}/items/${item.id}`, { headers: headers })
            .then(res => {
                this.props.updateItems();
                this.onClose();
            })
    }

    onEditSubmit = () => {
        let { formGroupName, formGroupDesc, formGroupPrice } = this.state;
        let { item, auth_token, categoryId } = this.props;

        const data = {
            "name": formGroupName.toString(),
            "description": formGroupDesc.toString(),
            "price": parseInt(formGroupPrice)
        }
        const headers = {
            'Authorization': 'JWT ' + auth_token,
        }
        axios.put(`${serverURL}/categories/${categoryId}/items/${item.id}`, data, { headers: headers })
            .then(res => {
                this.props.updateItems();
                this.onClose();
            })
    }

    render() {

        let { showModal } = this.props;
        let { editMode } = this.state;
        return (
            <Modal show={showModal} centered>
                <Modal.Header>
                    <Modal.Title>Item Details</Modal.Title>
                </Modal.Header>
                {
                    editMode ?
                        this.renderEditMode() :
                        this.renderViewMode()
                }
            </Modal>
        );
    }
}

export { ItemModal };
export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);