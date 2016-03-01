import React, { Component, PropTypes } from 'react';
import 'mapbox-gl-leaflet';
import 'leaflet-pulse-icon';
import 'leaflet-control-window';
import 'leaflet.locatecontrol';
import 'leaflet-geocoder-mapzen';

import './styles.sass';

/**
 * This component is responsible to render the map.
 *
 */
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.markersLayer = null;
  }

  /**
   * The map is instanciated when the component is mounted.
   * It uses mapbox-gl-leaflet to wrap the WebGL layer provided
   * by Mapbox GL.js in the Leaflet API. This allows to use Leaflet
   * plugins and to fallback to Leaflet in case the browser does not
   * supports/enables WebGL.
   *
   */
  componentDidMount() {
    const { ui, uiActions } = this.props;

    const options = ui.map.options;

    this.markersLayer = L.layerGroup();
    let layers;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
      layers = ui.map.vectorlayers.map(layer => L.mapboxGL(layer));
      options.layers = [layers[0], this.markersLayer]; // Base layer and markers layer
      this.map = L.map('map', options);
    } else {
      layers = ui.map.tilelayers.map(layer => L.tileLayer(layer.style, layer.options));
      options.layers = [layers[0], this.markersLayer]; // Base layer and markers layer
      this.map = L.map('map', options);
    }

    this.map.fitWorld().zoomIn();
    this.map.on('resize', () => this.map.fitWorld({ reset: true }).zoomIn());

    // About popup
    L.control.window(this.map, ui.overlay)
          .prompt({
            callback: () => true
          }).show();

    // Search (Geocoder)
    const geocoder = L.control.geocoder(ui.map.geocoderToken, {
      expanded: true,
      markers: false
    }).addTo(this.map);

    geocoder.on('select', () => {
      uiActions.disableActive();
      uiActions.pause();
    });

    L.control.zoom().addTo(this.map);

    // Geolocator
    const lc = L.control.locate({
      locateOptions: {
        minzoom: 1,
        maxZoom: 8,
        zoom: 7
      },
      onLocationError: (err) => {
        console.log(err.message);
      }
    }).addTo(this.map);

    lc.start();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  /**
   * Adds a pulsing marker to map. The size of the icon depends on
   * the magnitude of the corresponding event.
   *
   */
  addMarkers(earthquake) {
    let duplicate;
    this.markersLayer.eachLayer(layer => {
      if (layer.getLatLng().equals(earthquake.geometry.coordinates)) {
        duplicate = true;
      }
    });


    if (!duplicate) {
      const radius = this.calculateRadius(earthquake.properties.mag);
      const marker = L.marker(earthquake.geometry.coordinates, {
        icon: L.icon.pulse({ iconSize: [radius, radius], color: 'red' })
      }).addTo(this.markersLayer);

      marker.on('click', () => {
        const target = this.props.earthquakes
                          .earthquakes
                          .findIndex(quake => quake.properties.url === earthquake.properties.url);
        this.props.uiActions.setActive(target);
      });
    }
  }

  /**
   * Calculate the radius of the marker, depending on the given
   * magnitude.
   *
   */
  calculateRadius(mag) {
    const radius = Math.sqrt(mag / Math.PI);
    return radius * 25;
  }

  /**
   * Renders th map and fly to the location of the event marked as
   * active.
   *
   */
  render() {
    const { earthquakes, ui } = this.props;

    if (ui.active || (ui.active === 0)) {
      this.map.setView(earthquakes.earthquakes[ui.active].geometry.coordinates, 4, {
        animate: true,
        pan: {
          duration: 1.0          
        }
      });
    } else if (this.map && typeof earthquakes.earthquakes[0] !== 'undefined') {
      this.addMarkers(earthquakes.earthquakes[0]);
    }

    return (
      <div id="map"></div>
    );
  }
}

Map.propTypes = {
  earthquakes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired
};
