import React, { Component } from 'react';
import { Dropdown, InputGroup, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories } from '../../actions/categories.action';
import { serverURL } from '../../constants/config';

function mapStateToProps(state) {
    state = state.catReducer;
    return {
        categories: state.categories,
        auth_token: state.auth_token
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCategories }, dispatch);
}

class CatSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            searchText: '',
            selectedCategory: -1,
        }
    }

    componentDidMount() {
        axios.get(`${serverURL}/categories?offset=0&limit=0`)
            .then(res => {
                axios.get(`${serverURL}/categories?offset=0&limit=${res.data['total_categories']}`)
                    .then(res => {
                        this.props.getCategories(res.data['categories']);
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    // Change selected category from dropdown
    selection = (eventKey, e) => {
        this.setState({
            searchText: e.target.innerText,
            selectedCategory: parseInt(e.target.getAttribute('catid')),
            show: false
        });
        this.props.selection(parseInt(e.target.getAttribute('catid')));
    }

    // On change search box text
    search = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    }

    // Open dropdown menu
    drop = () => {
        this.setState({
            searchText: '',
            show: true
        });
    }

    // Close dropdown menu
    up = () => {
        this.setState({
            show: false
        });
    }

    // Filter category list by search text
    filterBySearch = (catName) => {
        return catName.toLowerCase().includes(this.state.searchText.toLowerCase());
    }

    render() {

        let { searchText, selectedCategory, show } = this.state
        let { categories } = this.props;
        
        return (
            <div className="cat-filter">
                <InputGroup className="mb-3">
                    <Form.Control
                        id="cat-searchbar"
                        placeholder="Category Search"
                        aria-label="Category"
                        value={searchText}
                        onChange={e => this.search(e)}
                        onFocus={this.drop}
                        autoComplete="off"
                    />
                    {show ?
                        <InputGroup.Append>
                            <Button variant="danger" className="close-btn" onClick={this.up}>Close</Button>
                        </InputGroup.Append>
                        : null
                    }
                </InputGroup>
                <Dropdown show={show} onSelect={(eventKey, e) => this.selection(eventKey, e)}>
                    <Dropdown.Menu className="cat-search-menu">
                        <div className="scrolling-div">
                            {
                                categories.filter(category => this.filterBySearch(category['name'])).map((category, index) =>
                                    <Dropdown.Item catid={category['id']} key={index} eventKey={index}>{category['name']}</Dropdown.Item>
                                )
                            }
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

CatSearch.propTypes = {
    selection: PropTypes.func.isRequired
}

export { CatSearch };
export default connect(mapStateToProps, mapDispatchToProps)(CatSearch);