import React, { Component } from 'react';
import Header from '../Header';
import CatList from '../CatList';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories } from '../../actions/categories.action';

function mapStateToProps(state) {
    return {
        scrolled: state.scrolled,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCategories }, dispatch);
}

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/categories?offset=0&limit=0')
            .then(res => {
                axios.get(`http://localhost:5000/categories?offset=0&limit=${res.data['total_categories']}`)
                    .then(res => {
                        this.props.getCategories(res.data['categories']);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let { categories } = this.props;
        return (
            <div>
                <Header />
                <CatList categories={Array.from(categories)} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);