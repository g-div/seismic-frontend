/**
 * The file contains all redux actions concerning seismic events
 *
 */
import { RECEIVE_EARTHQUAKE, REQUEST_HISTORY, NOTIFY } from '../constants/ActionTypes';

import config from '../config.json';

/**
 * This is asynchronously called when data about a single
 * seismic event is received.
 *
 */
export function receive(message = { data: '' }) {
  return {
    type: RECEIVE_EARTHQUAKE,
    message
  };
}

/**
 * This send is called to send a HTML5 Notification containing
 * the message passed as parameter.
 *
 */
export function notify(message = { data: {} }) {
  return {
    type: NOTIFY,
    message
  };
}

/**
 * This is called once on application start to open an SSE
 * connection and listen on it.
 *
 * It calls receive and notify when a new event occurs.
 *
 */
export function listenToEarthquakes() {
  return dispatch => {
    const es = new EventSource(config.streamURL);

    es.addEventListener('quakes', message => {
      const data = JSON.parse(message.data);
      dispatch(receive(data));
      dispatch(notify(data));
    });

    es.addEventListener('end', () => {
      this.close();
    });
  };
}

/**
 * This is called once on application start in order to request
 * the permission to send HTML5 Notification
 *
 */
export function activateNotifications() {
  return () => Notification.requestPermission();
}

/**
 * This is used to receive multiple events as array
 *
 */
export function receiveMultiple(data = []) {
  return {
    type: REQUEST_HISTORY,
    data
  };
}

/**
 * This action can be called to request the events precedent
 * to a given time, passed as ISO8601
 *
 */
export function requestHistory(time) {
  return dispatch => {
    fetch(`${config.queryURL}?time=${time}`)
      .then(res => res.json().then(data => dispatch(receiveMultiple(data))));
  };
}
