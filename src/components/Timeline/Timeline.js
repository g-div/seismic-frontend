import React, { Component, PropTypes } from 'react';
import { ChartCanvas, Chart, DataSeries, EventCapture, helper } from 'react-stockcharts';
const { HistogramSeries } = require('react-stockcharts').series;
const { XAxis, YAxis } = require('react-stockcharts').axes;
import d3 from 'd3';

import './style.sass';

/**
 * The component renders a timeline composed of a bar-char,
 * which can pan on the x axis.
 *
 */
class Timeline extends Component {
  move() {
    if (this.refs.chart.getDataInfo().viewData.end !== this.refs.chart.getDataInfo().fullData.end) {
      this.props
        .earthquakeActions
        .requestHistory(this.refs.chart.getDataInfo().viewData.start.properties.time);
    }
  }

  render() {
    const { earthquakes } = this.props;

    return (
      <ChartCanvas ref="chart" width={ 800 } height={ 60 }
        margin={{ left: 50, right: 50, top: 10, bottom: 20 }}
        data={ earthquakes.earthquakes.slice().reverse() }
      >
        <Chart id={ 0 } xAccessor={ d => { if (d) { return new Date(d.properties.time); }}}>
            <XAxis axisAt="bottom" orient="bottom"
              ticks={ 6 } tickFormat={ d => { return d3.time.format('%H:%M')(new Date(d)); }}
            />
            <YAxis axisAt="left" orient="left" ticks={ 3 } />
            <DataSeries id={ 0 } yAccessor={ d => d.properties.mag } >
                <HistogramSeries ref="histo" />
            </DataSeries>
        </Chart>
        <EventCapture mouseMove zoom pan
          mainChart={ 0 } defaultFocus={ false } onPan={ this.move.bind(this) }
        />
      </ChartCanvas>
    );
  }
}

Timeline.propTypes = {
  earthquakes: PropTypes.object.isRequired,
  earthquakeActions: PropTypes.object.isRequired,
};

export default helper.fitWidth(Timeline);
