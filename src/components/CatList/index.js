import React, { Component } from 'react';
import { InputGroup, FormControl, Form, Dropdown, Button } from 'react-bootstrap';
import ItemList from '../ItemList';
import PropTypes from 'prop-types';

class CatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            show: false,
            selectedCategory: -1
        }
    }

    search = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    }

    drop = () => {
        this.setState({
            searchText: '',
            show: true
        });
    }

    up = () => {
        this.setState({
            show: false
        });
    }

    filterBySearch = (catName) => {
        return catName.toLowerCase().includes(this.state.searchText.toLowerCase());
    }


    selection = (eventKey, e) => {
        this.setState({
            searchText: e.target.innerText,
            selectedCategory: parseInt(e.target.getAttribute('catid')),
            show: false
        });
    }

    render() {
        let { searchText, selectedCategory, show } = this.state
        let { categories } = this.props;
        return (
            <div className="cat-filter-container">
                <div>
                    <h1 className='main-name'>Find items by category.</h1>
                    <hr></hr>
                </div>
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
                <ItemList categoryId={selectedCategory} />
                <div className="page-btn-div">
                    <Button className="page-btn">Previous</Button>
                    <p>Pages</p>
                    <Button className="page-btn">Next</Button>
                </div>
            </div >
        );
    }
}

CatList.propTypes = {
    categories: PropTypes.array.isRequired
}

export default CatList;