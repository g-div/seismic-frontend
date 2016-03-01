/**
 * Here are listed all actions used for user interaction.
 *
 */
import { SET_ACTIVE, DISABLE_ACTIVE, PLAY, PAUSE } from '../constants/ActionTypes';

/**
 * Called to set an element active by its index in the array
 * stored in the state.
 *
 */
export function setActive(index) {
  return {
    type: SET_ACTIVE,
    index
  };
}

/**
 * Called to deactivate the active entry.
 *
 */
export function disableActive() {
  return {
    type: DISABLE_ACTIVE
  };
}

/**
 * This is called when the user resume the real-time modus.
 *
 */
export function play() {
  return {
    type: PLAY
  };
}

/**
 * Is called when the user pauses the real-time modus.
 * The application will then not receive new events.
 *
 */
export function pause() {
  return {
    type: PAUSE
  };
}

export function togglePause() {
  return (dispatch, getState) => {
    const { UI } = getState();

    if (UI.paused) {
      dispatch(play());
    } else {
      dispatch(pause());
    }
  };
}
