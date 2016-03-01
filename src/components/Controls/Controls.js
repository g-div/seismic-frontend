import React, { Component, PropTypes } from 'react';

import PauseIcon from 'react-icons/lib/md/pause-circle_outline';
import PlayIcon from 'react-icons/lib/md/play-circle-filled';

import { MorphReplace } from 'react-svg-morph';
import Ink from 'react-ink';

import './styles.sass';

/**
 * This is a play/pause button, rendered depending on the passed
 * state.
 *
 */
export default class Controls extends Component {
  /**
   * Pause the application, called when the play/pause
   * button is clicked.
   *
   */
  togglePause() {
    this.props.uiActions.togglePause();
    this.forceUpdate();
  }

  /**
   * It renders the play/pause icon depending on the passed
   * props.
   *
   */
  render() {
    const { ui } = this.props;
    const icon = ui.paused ? <PlayIcon key="play-circle-filled" /> : <PauseIcon key="pause-circle_outline" />;

    return (
        <div id="controls" className="noselect" onClick={this.togglePause.bind(this)}>
          <Ink />
          <MorphReplace>
            {icon}
          </MorphReplace>
        </div>
    );
  }
}

Controls.propTypes = {
  ui: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired
};
