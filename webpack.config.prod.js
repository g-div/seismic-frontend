const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'eventsource-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyWebpackPlugin([
      { from: 'static' },
      { from: 'index.html' }
    ]),    
    new webpack.ProvidePlugin({
      leaflet: 'leaflet',
      L: 'leaflet',
      mapboxgl: 'mapbox-gl/mapbox-gl-dev.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json/,
      loaders: ['json']
    }, {
      test: /\.(css|scss|sass)$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loaders: ['file']
    }, {
      test: /\.(glsl|frag|vert)$/,
      loader: 'raw!glslify' 
    }]
  },
  context: __dirname,
  node: {
    __dirname: true,
    __filename: true
  },
  resolve: {
    alias:{
      'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/')
    }
  }
};
