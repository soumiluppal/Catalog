import React, { Component } from 'react';
import { Navigation } from '../../common';
import { Button } from 'react-bootstrap';

import '../../styles/style.css';
import downicon from '../../images/down.png';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="App-header">
                <div className='main-name-div'>
                    <h1 className='main-name'>Welcome to <b>Catalog</b>!</h1>
                    <hr></hr>
                    <p>Your one stop for everything!</p>
                </div>
                <div className="btn-div">
                    <Button className="btn-scroll-down">
                        Check out our categories
                    <br></br>
                        <img className='icon' src={downicon}></img>
                    </Button>
                </div>
            </header>
        );
    }
}

export default Header;