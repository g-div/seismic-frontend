import React, { PropTypes } from 'react';

/**
 * This is a footer container. It can be used to render
 * all passed children to the footer element.
 *
 */
export default function Footer(props) {
  return (
    <footer className="hero-footer" style={{ height: '7%' }}>
        {props.children}
    </footer>
  );
}

Footer.propTypes = {
  children: PropTypes.array.isRequired
};
