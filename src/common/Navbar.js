import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Navstyle.css';

class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolled: false,
        };
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate() {
        if (this.state.scrolled != this.props.scrolled) {
            this.setState({
                scrolled: this.props.scrolled,
            });
        }
    }

    goToTop() {
        window.scroll({top: 0, left: 0, behavior: "auto"});
    }

    render() {
        let { scrolled } = this.state;

        return (
            <Navbar className={scrolled.toString()} fixed='top' expand='md'>
                <Navbar.Brand href="/" className="name-brand" onClick={this.goToTop}>Catalog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav
                        variant='pills'
                    >
                        <Nav.Item className="main-nav-item">
                            <Nav.Link href='user' className="main-nav-link">Sign In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="main-nav-item">
                            <Nav.Link href='myitems' className="main-nav-link">My Items</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

MyNavbar.propTypes = {
    scrolled: PropTypes.bool.isRequired
}

export default MyNavbar;