import React, { Component } from 'react';
import Header from '../Header';
import CatList from '../CatList';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { categories } = this.props;
        console.log(categories);
        return (
            <div>
                <Header />
                <CatList />
            </div>
        );
    }
}

export default Home;