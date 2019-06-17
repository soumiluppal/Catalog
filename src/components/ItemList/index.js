import React, { Component } from 'react';
import '../../styles/style.css';
import { ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios'
import PropTypes from 'prop-types';
import { pageSize } from '../../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openModal } from '../../actions/modal.action';
import { ItemModal } from '../../common';
import { serverURL } from '../../constants/config';

function mapStateToProps(state) {
    state = state.modalReducer;
    return {
        showModal: state.showModal,
        item: state.item,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ openModal }, dispatch);
}

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allItems: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.categoryId != null && this.props.categoryId !== -1 && this.props.categoryId !== prevProps.categoryId) {
            let { categoryId } = this.props;
            let self = this;
            axios.get(`${serverURL}/categories/${categoryId}/items?offset=0&limit=0`)
                .then(res => {
                    axios.get(`${serverURL}/categories/${categoryId}/items?offset=0&limit=${res.data['total_items']}`)
                        .then(res => {
                            self.setState({
                                allItems: Array.from(res.data['items']).filter(item => this.filterByUser(item)),
                            }, () => {
                                self.props.setLimit(parseInt(this.state.allItems.length));
                            })
                        })
                })
        }
    }

    updateItems = async () => {
        let { categoryId } = this.props;
        let self = this;
        axios.get(`${serverURL}/categories/${categoryId}/items?offset=0&limit=0`)
            .then(res => {
                axios.get(`${serverURL}/categories/${categoryId}/items?offset=0&limit=${res.data['total_items']}`)
                    .then(res => {
                        self.setState({
                            allItems: Array.from(res.data['items']).filter(item => this.filterByUser(item)),
                        }, () => {
                            self.props.setLimit(parseInt(this.state.allItems.length));
                        })
                    })
            })
    }

    onItemClick = (item) => {
        this.props.openModal(item);
    }

    paginateItems = () => {
        let { page } = this.props;
        let { allItems } = this.state;

        return allItems.slice((page - 1) * pageSize, page * pageSize);
    }

    filterByUser = (item) => {
        if (!this.props.user_id || this.props.user_id === '') {
            return true;
        }
        else if (this.props.user_id === item['user_id']) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {

        let items = this.paginateItems();

        return (
            <div className="item-list-div">
                <ListGroup className="item-list-group">
                    {
                        items.slice(0, Math.ceil(items.length / 2)).map((item, index) => <ListGroup.Item key={index} className="list-item">
                            <Button className="item-btn" onClick={e => this.onItemClick(item)}>
                                <Card className="item-card">
                                    <Card.Title className="item-card-name">{item['name']}</Card.Title>
                                    <Card.Body className="item-card-body">
                                        <Card.Text className="item-card-text">
                                            ${item['price']}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Button>
                        </ListGroup.Item>)
                    }
                </ListGroup>
                <ListGroup className="item-list-group">
                    {
                        items.slice(Math.ceil(items.length / 2)).map((item, index) => <ListGroup.Item key={index} className="list-item">
                            <Button className="item-btn" onClick={e => this.onItemClick(item)}>
                                <Card className="item-card">
                                    <Card.Title className="item-card-name">{item['name']}</Card.Title>
                                    <Card.Body className="item-card-body">
                                        <Card.Text className="item-card-text">
                                            ${item['price']}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Button>
                        </ListGroup.Item>)
                    }
                </ListGroup>
                <ItemModal categoryId={this.props.categoryId} updateItems={this.updateItems}/>
            </div>
        );
    }
}

ItemList.propTypes = {
    categoryId: PropTypes.number.isRequired
}

export { ItemList };
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);