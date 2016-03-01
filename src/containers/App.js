import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import List from '../components/List/List';

import Main from '../containers/Main';
import Sidebar from '../containers/Sidebar';
import Footer from '../containers/Footer';

import Map from '../components/Map/Map';
import Controls from '../components/Controls/Controls';
import Timeline from '../components/Timeline/Timeline';
import Details from '../components/Details/Details';

import BackIcon from 'react-icons/lib/fa/arrow-left';

import * as EarthquakeActions from '../actions/EarthquakeActions';
import * as UIActions from '../actions/UIActions';

import '../styles/index.sass';

/**
 * This is the main component of the application, which is used
 * to pass the application state to all children.
 */
export default class App extends Component {
  componentDidMount() {
    const { earthquakeActions } = this.props;
    earthquakeActions.listenToEarthquakes();
    earthquakeActions.activateNotifications();
  }

  render() {
    const { uiActions } = this.props;

    return (
        <section className="hero is-primary is-fullheight is-fullwidth">
          <Sidebar {...this.props}>
              <div>
                <h4 className="title is-4 flip-title"> Last earthquakes: </h4>
                <div id="list-container">
                  <List ref="list" {...this.props} />
                </div>
              </div>
              <div>
              <nav className="navbar">
                <div className="navbar-item navbar-left">
                  <div><BackIcon onClick={uiActions.disableActive} /></div>
                </div>
              </nav>
                <Details {...this.props} />
              </div>
          </Sidebar>
          <Main {...this.props}>
            <Map {...this.props} />
          </Main>
          <Footer {...this.props}>
            <Controls ref="controls" {...this.props} />
            <Timeline {...this.props} />
          </Footer>
        </section>
    );
  }
}

App.propTypes = {
  earthquakes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  earthquakeActions: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    earthquakes: state.earthquake,
    ui: state.UI
  };
}

function mapDispatchToProps(dispatch) {
  return {
    earthquakeActions: bindActionCreators(EarthquakeActions, dispatch),
    uiActions: bindActionCreators(UIActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
