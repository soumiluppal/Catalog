import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Navstyle.css';

class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navStyle: 'unscrolled',
        };
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate() {
        console.log(this.state.navStyle);
        let navStyle = this.props.navStyle;
        if (this.state.navStyle != navStyle) {
            this.setState({
                navStyle: navStyle,
            });
        }
    }

    componentDidUpdate() {
        console.log(this.state.navStyle);
        let navStyle = this.props.navStyle;
        if (this.state.navStyle != navStyle) {
            this.setState({
                navStyle: navStyle
            });
        }
    }

    goToTop() {
        window.scroll({top: 0, left: 0, behavior: "auto"});
    }

    render() {
        let navStyle = this.state.navStyle;

        return (
            <Navbar className={navStyle} fixed='top' expand='md'>
                <Navbar.Brand href="home" className="name-brand" onClick={this.goToTop}>Catalog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav
                        variant='pills'
                    >
                        <Nav.Item>
                            <Nav.Link href='user'>Sign In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='myitems'>My Items</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default MyNavbar;