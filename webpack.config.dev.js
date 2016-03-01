const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new CopyWebpackPlugin([
      { from: 'static' }
    ]),    
    new webpack.ProvidePlugin({
      leaflet: 'leaflet',
      L: 'leaflet',
      mapboxgl: 'mapbox-gl/mapbox-gl-dev.js'
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
  resolve: {
    alias: {
      'fs': path.join(__dirname, 'mock', 'fs')
    }
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
