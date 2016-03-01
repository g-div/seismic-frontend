/**
 * This sets up the SSE connection and listens to messages
 *
 */
const es = new EventSource('http://seismic.localhorst.io/earthquakes');

es.addEventListener('quakes', message => {
  postMessage(JSON.parse(message.data));
});

es.addEventListener('end', () => {
  this.close();
});
