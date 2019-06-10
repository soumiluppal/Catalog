import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../../common';
import Home from '../Home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchScrolled } from '../../actions/categories.action';

import '../../styles/style.css';

function mapStateToProps(state) {
  return {
    scrolled: state.scrolled,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({switchScrolled}, dispatch);
}

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 200;
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
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
