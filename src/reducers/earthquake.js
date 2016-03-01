import { RECEIVE_EARTHQUAKE, REQUEST_HISTORY, NOTIFY } from '../constants/ActionTypes';

import config from '../config.json';
/**
 * The reducer is responsible for changing the state of the
 * application, depending on the actions related to seismic
 * events called from the single components.
 *
 */
export default function earthquake(state = {
  earthquakes: [],
  logo: config.logo
}, action) {
  switch (action.type) {
    case RECEIVE_EARTHQUAKE:
      // do nothing if paused
      if (state.paused) return state;

      // replace details on update
      if (action.message.properties.update) {
        const index = state
          .earthquakes
          .findIndex(quake => quake.properties.url === action.message.properties.url);
        state.earthquakes[index] = action.message;
        return state;
      }

      // invert lat,lng as expected by leaflet
      action.message.geometry.coordinates.reverse();

      return Object.assign({}, state, {
        earthquakes: [
          action.message,
          ...state.earthquakes
        ]
      });
    case REQUEST_HISTORY:
      action.data.map(quake =>
        quake.geometry.coordinates = quake.geometry.coordinates.reverse());
      return Object.assign({}, state, {
        earthquakes: action.data.reverse()
      });
    case NOTIFY:
      // send notification if a new event is received
      if (!action.message.properties.update) {
        new Notification(action.message.properties.location, {
          body: `Magnitude: ${action.message.properties.mag}`,
          icon: state.logo
        });
      }
      return state;
    default:
      return state;
  }
}
