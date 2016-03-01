import React, { PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';
import FlipCard from 'react-flipcard';

/**
 * This modules provides a container to render children in
 * flippable cards in a sidebar. The sidebar can be closed
 * and opened again clicking on the menu button.
 *
 */
export default function Sidebar(props) {
  const styles = {
    bmMenuWrap: {
      height: '40%',
      top: '30%',
      maxWidth: '100%',
      borderRadius: '4px 0 0 4px'
    },
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '36px',
      top: '45%'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#373a47',
      fontSize: '1.15em',
      borderRadius: '4px 0 0 4px'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    }
  };

  return (
    <Menu right isOpen className="menu" styles={ styles } width={ 400 }>
      <FlipCard disabled
        flipped={ typeof props.ui.active !== 'undefined' }
        className="is-fullwidth"
      >
        { props.children }
      </FlipCard>
    </Menu>
  );
}


Sidebar.propTypes = {
  earthquakes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  earthquakeActions: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired
};
