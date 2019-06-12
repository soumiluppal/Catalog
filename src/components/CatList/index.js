import React, { Component } from 'react';
import { InputGroup, FormControl, Form, Dropdown, Button } from 'react-bootstrap';
import ItemList from '../ItemList';
import PropTypes from 'prop-types';
import CatSearch from '../CatSearch';
import { pageSize } from '../../constants';

class CatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: -1,
            page: 1,
            limit: 0
        }
    }

    selection = (catId) => {
        this.setState({
            selectedCategory: catId,
            page: 1
        });
    }

    next = () => {
        let { selectedCategory, page, limit } = this.state;
        if (selectedCategory > -1 && (page * pageSize) < limit) {
            this.setState({
                page: page + 1
            });
        }
    }

    setLimit = (limit) => {
        if (limit !== this.state.limit) {
            this.setState({
                limit: limit
            });
        }
    }

    previous = () => {
        let { selectedCategory, page } = this.state;
        if (selectedCategory > -1 && page > 1) {
            this.setState({
                page: page - 1
            });
        }
    }

    render() {

        let { selectedCategory, page, limit } = this.state;
        let { categories } = this.props;

        return (
            <div className="cat-filter-container">
                <CatSearch selection={this.selection.bind(this)} />
                {
                    !this.props.homeItems ?
                        <ItemList user_id={this.props.user_id} categoryId={selectedCategory} page={page} setLimit={this.setLimit} /> :
                        <ItemList categoryId={selectedCategory} page={page} setLimit={this.setLimit} />
                }
                <div className="page-btn-div">
                    {
                        page <= 1 ?
                            <Button className="page-btn" onClick={this.previous} disabled>Previous</Button> :
                            <Button className="page-btn" onClick={this.previous}>Previous</Button>
                    }
                    <p className="page-text">Page {page}</p>
                    {
                        (page * pageSize) >= limit ?
                            <Button className="page-btn" onClick={this.next} disabled>Next</Button> :
                            <Button className="page-btn" onClick={this.next}>Next</Button>
                    }
                </div>
            </div>
        );
    }
}

export default CatList;