import React, { Component, PropTypes } from 'react';

/**
 * This contains the table with all details about a certain event.
 *
 */
export default class Details extends Component {
  /**
   * The index passed as active key of the passed ui props is used
   * to find out the active event from the array passed as earthquakes
   * props.
   *
   */
  render() {
    const { earthquakes, ui } = this.props;

    if (typeof ui.active === 'undefined') return (<div></div>);

    const details = earthquakes.earthquakes[ui.active].properties;
    return (
        <div className="details">
          <h4 className="title is-4">{details.location}</h4>

          <table className="table is-bordered is-striped is-narrow">
            <tbody>
              <tr>
                <td>Magnitude</td>
                <td>{details.mag} {details.magtype}</td>
              </tr>
              <tr>
                <td>Depth</td>
                <td>{details.depth} km</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{new Date(details.time).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{new Date(details.time).toLocaleTimeString()}</td>
              </tr>
              <tr>
                <td>Updated at</td>
                <td>{new Date(details.lastupdate).toLocaleTimeString()}</td>
              </tr>
              <tr>
                <td>Data provider:</td>
                <td><a href="http://emsc-csem.org/">EMSC</a></td>
              </tr>
            </tbody>
          </table>
            <a className="button" href={details.url}>More details</a>
        </div>
    );
  }
}

Details.propTypes = {
  earthquakes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};
