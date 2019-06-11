import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navigation } from '../../common';
import Home from '../Home';
import NewAccount from '../NewAccount';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScrolled, getToken } from '../../actions/categories.action';

import routes from '../../constants';
import '../../styles/style.css';
import AddItem from '../AddItem';

function mapStateToProps(state) {
    return {
        scrolled: state.scrolled,
        categories: state.categories,
        auth_token: state.auth_token
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ switchScrolled, getToken }, dispatch);
}

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 500;
            if (isTop === false) {
                this.props.switchScrolled(true)
            }
            else if (isTop === true) {
                this.props.switchScrolled(false);
            }
        });
    }

    render() {

        let { scrolled, categories, auth_token } = this.props;

        return (
            <div className="App">
                <Navigation user={auth_token ? true : false} scrolled={scrolled} />
                <Switch>
                    <Route exact path={routes.HOME} render={() => <Home />} />
                    <Route exact path={routes.USER} render={() => <NewAccount getToken={this.props.getToken} />} />
                    <Route exact path={routes.ITEM} render={() => <AddItem auth_token={auth_token} />} />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
