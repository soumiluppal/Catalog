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

        let { scrolled, categories } = this.props;

        return (
            <div className="App">
                <Navigation scrolled={scrolled} />
                <Switch>
                    <Route exact path={routes.HOME} render={() => <Home />} />
                    <Route exact path={routes.USER} render={() => <NewAccount getToken={this.props.getToken} switchScrolled={this.props.switchScrolled}/>} />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
