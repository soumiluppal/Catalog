import React, { Component } from 'react';
import Header from '../Header';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {
                byId: {
                    
                }
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                <h1>HOME</h1>
            </div>
        );
    }
}

export default Home;