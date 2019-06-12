import React, { Component } from 'react';
import Header from '../Header';
import CatList from '../CatList';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="section-container">
                    <div className="section-heading-div">
                        <h1 className='main-name'>Find items by category.</h1>
                        <hr></hr>
                    </div>
                    <CatList user_id={this.props.user_id} homeItems />
                </div>
            </div>
        );
    }
}

export default Home;