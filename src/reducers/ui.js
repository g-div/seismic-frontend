import { PLAY, PAUSE, SET_ACTIVE, DISABLE_ACTIVE } from '../constants/ActionTypes';

import config from '../config.json';

/**
 * This reducer handles all actions related to
 * user interaction.
 *
 */
export default function UI(state = {
  paused: false,
  map: config.map,
  overlay: config.overlay
}, action) {
  switch (action.type) {
    case SET_ACTIVE:
      return Object.assign({}, state, {
        active: action.index
      });
    case DISABLE_ACTIVE:
      delete state.active;
      return Object.assign({}, state, {});
    case PLAY:
      return Object.assign({}, state, {
        paused: false
      });
    case PAUSE:
      return Object.assign({}, state, {
        paused: true
      });
    default:
      return state;
  }
}
