import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';


/**
 * The maps the application state stored in the store to the
 * main App component
 *
 */
export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


Root.propTypes = {
  store: PropTypes.object.isRequired
};
