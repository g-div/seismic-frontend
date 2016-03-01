import React, { PropTypes } from 'react';

/**
 * The is the main wrapper for the content of the application
 *
 */
export default function Main(props) {
  return (
    <div className="hero-content container">
        {props.children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.object.isRequired
};
