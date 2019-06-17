import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navigation } from '../../common';
import Home from '../Home';
import NewAccount from '../NewAccount';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScrolled, getToken, signOut } from '../../actions/categories.action';

import routes from '../../constants';
import '../../styles/style.css';
import AddItem from '../AddItem';
import Account from '../Account';

function mapStateToProps(state) {
    state = state.catReducer;
    return {
        scrolled: state.scrolled,
        categories: state.categories,
        auth_token: state.auth_token,
        user_id: state.user_id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ switchScrolled, getToken, signOut }, dispatch);
}

class Main extends Component {

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

        let { scrolled, categories, auth_token, user_id } = this.props;

        return (
            <div className="App">
                <Navigation user={auth_token ? true : false} scrolled={scrolled} signOut={this.props.signOut} />
                <Switch>
                    <Route exact path={routes.HOME} render={() => <Home user_id={this.props.user_id}/>} />
                    <Route exact path={routes.USER} render={() => <NewAccount getToken={this.props.getToken} user_id={this.props.user_id} />} />
                    <Route exact path={routes.ITEM} render={() => <AddItem auth_token={auth_token} />} />
                    <Route exact path={routes.ACCOUNT} render={() => <Account user_id={user_id} auth_token={auth_token} />} />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
