import React, { Component } from 'react';

import '../../styles/style.css';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios'
import PropTypes from 'prop-types';

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            pulled: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.categoryId != null && this.props.categoryId != -1 && this.props.categoryId !== prevProps.categoryId) {
            let { categoryId } = this.props;
            let self = this;
            axios.get(`http://localhost:5000/categories/${categoryId}/items?offset=0&limit=5`)
                .then(res => {
                    self.setState({
                        items: res.data['items']
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    render() {

        let { items } = this.state;
        items = Array.from(items);
        return (
            <div className="item-list-div">
                <ListGroup>
                    {
                        items.map(item => <ListGroup.Item>{item['name']}</ListGroup.Item>)
                    }
                </ListGroup>
            </div>
        );
    }
}

ItemList.propTypes = {
    categoryId: PropTypes.number.isRequired
}

export default ItemList;