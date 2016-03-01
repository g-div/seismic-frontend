import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
import TimeAgo from 'react-timeago';
import { Scrollbars } from 'react-custom-scrollbars';

import './styles.sass';

const gradient = [
  '#55ff00',
  '#aaff00',
  '#ffff00',
  '#ffaa00',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000',
  '#ff0000'
];

/**
 * This render the table containing all entries from the
 * earthquakes.earthquakes array.
 *
 */
export default class List extends Component {
  /**
   * It renders each row of the table
   *
   */
  renderItem(index, key) {
    const mag = this.props.earthquakes.earthquakes[index].properties.mag;
    return (
      <tr key={key} onClick={ () => this.props.uiActions.setActive(index) }>
        <td className="mag" style={{ backgroundColor: gradient[parseInt(mag)] }}>
          { mag }
        </td>
        <td className="region">
          { this.props.earthquakes.earthquakes[index].properties.location }
        </td>
        <td><TimeAgo date={ this.props.earthquakes.earthquakes[index].properties.time } /></td>
      </tr>
    );
  }

  /**
   * It calls the renderItem method for each row of the table
   *
   */
  renderItems(items, ref) {
    return (
      <table className="table" ref={ ref }>
        <thead>
          <tr>
            <th>Mag</th>
            <th>Region</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    );
  }

  /**
   * It calls the renderItems to render the table
   *
   */
  render() {
    const { earthquakes } = this.props;

    return (
        <Scrollbars id="scrollbars-container">
          <ReactList className="menu-block"
            itemsRenderer={ this.renderItems.bind(this) }
            itemRenderer={this.renderItem.bind(this)}
            length={earthquakes.earthquakes.length}
            type="simple"
          />
        </Scrollbars>
    );
  }
}

List.propTypes = {
  earthquakes: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired
};
