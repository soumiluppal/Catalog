import React, { Component } from 'react';

import '../../styles/style.css';
import { ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios'
import PropTypes from 'prop-types';
import { pageSize } from '../../constants';

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            pulled: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.categoryId != null && this.props.categoryId != -1 && (this.props.categoryId !== prevProps.categoryId || this.props.page !== prevProps.page)) {
            let { categoryId, page } = this.props;
            let self = this;
            axios.get(`http://localhost:5000/categories/${categoryId}/items?offset=${(page - 1) * pageSize}&limit=${pageSize}`)
                .then(res => {
                    console.log(res.data)
                    self.setState({
                        items: res.data['items'],
                    });
                    self.props.setLimit(parseInt(res.data["total_items"]));
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
                <ListGroup className="item-list-group">
                    {
                        items.slice(0, Math.ceil(items.length/2)).map((item, index) => <ListGroup.Item key={index} className="list-item">
                            <Card className="item-card">
                                <Card.Title className="item-card-name">{item['name']}</Card.Title>
                                <Card.Body className="item-card-body">
                                    <Card.Text className="item-card-text">
                                        {item['description']}
                                    </Card.Text>
                                    <Card.Text className="item-card-text">
                                        ${item['price']}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>)
                    }
                </ListGroup>
                <ListGroup className="item-list-group">
                    {
                        items.slice(Math.ceil(items.length/2)).map((item, index) => <ListGroup.Item key={index} className="list-item">
                            <Card className="item-card">
                                <Card.Title className="item-card-name">{item['name']}</Card.Title>
                                <Card.Body className="item-card-body">
                                    <Card.Text className="item-card-text">
                                        {item['description']}
                                    </Card.Text>
                                    <Card.Text className="item-card-text">
                                        ${item['price']}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>)
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