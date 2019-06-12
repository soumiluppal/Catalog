import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/style.css';
import { Modal, Button, Nav, Form } from 'react-bootstrap';
import routes from '../../constants';
import { withRouter } from 'react-router-dom';
import NewAccount from '../NewAccount';
import PropTypes from 'prop-types';
import CatList from '../CatList';

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderNotLoggedIn() {
        this.props.history.push('/user');
    }

    renderLoggedIn() {

        let { user_id, auth_token } = this.props;

        return (
            <CatList user_id={user_id} />
        );
    }

    render() {

        let { user_id, auth_token } = this.props;

        return (
            <div className="account-container">
                <div className="section-container">
                    <h1>Your Items</h1>
                    {
                        user_id ?
                            this.renderLoggedIn() :
                            this.renderNotLoggedIn()
                    }
                </div>
            </div>
        );
    }
}

Account.propTypes = {
    user_id: PropTypes.number.isRequired,
    auth_token: PropTypes.string.isRequired
}

export default withRouter(Account);