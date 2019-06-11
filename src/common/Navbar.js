import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Navstyle.css';

class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolled: false,
            user: false
        };
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate() {
        if (this.state.scrolled !== this.props.scrolled) {
            this.setState({
                scrolled: this.props.scrolled,
            });
        }
        if (this.state.user !== this.props.user) {
            this.setState({
                user: this.props.user,
            });
        }
    }

    goToTop() {
        window.scroll({ top: 0, left: 0, behavior: "auto" });
    }

    render() {
        let { scrolled, user } = this.state;

        return (
            <Navbar className={scrolled.toString()} fixed='top' expand='md'>
                <Navbar.Brand as={Link} to="/" className="name-brand" onClick={this.goToTop}>Catalog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav
                        variant='pills'
                    >
                        <Nav.Item className="main-nav-item">
                            {
                                user ?
                                    <Nav.Link as={Link} to='account' className="main-nav-link">My Account</Nav.Link> :
                                    <Nav.Link as={Link} to='user' className="main-nav-link">Sign In</Nav.Link>
                            }
                        </Nav.Item>
                        <Nav.Item className="main-nav-item">
                            <Nav.Link as={Link} to='additem' className="main-nav-link">Add Item</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

MyNavbar.propTypes = {
    scrolled: PropTypes.bool.isRequired,
    user: PropTypes.bool
}

export default MyNavbar;