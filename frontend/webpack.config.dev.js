// Webpack config for:
// - Development
// - Extracting CSS into dist/bundle.css
// - No hotloading
require('babel/register');

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var jeet                  = require("jeet");
var rupture               = require("rupture");

var resolve = {
  extensions: ["", ".js", ".jsx", ".json", ".css", ".styl"],
  fallback: path.join(__dirname, 'node_modules'),
  root: path.join(__dirname, 'src', 'scripts'),
  alias: {
    react: path.join(__dirname, "node_modules/react")
  }
};

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/scripts/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    sourceMapFileName: 'bundle.map',
    publicPath: '/public/' // Used in webpack-dev-server as the directory for bundle.js
  },
  stylus:  {
    use: [jeet(), rupture()]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  resolve: resolve,
  resolveLoader: resolve,
  module: {
    /*preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint'
    }],*/
    loaders: [
      // IMPORTANT: we don"t want to process EVERY single JS file with babel
            // loader. We only want to process the files inside our app structure
            // otherwise this could get very slow or even fail.
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot-loader", "babel-loader?optional=runtime&stage=0"]},

            {test: /\.json$/, loader: "json-loader"},
            {test: /\.css$/,  loader: "style-loader!css-loader?modules"},
            {test: /\.styl$/, loader: "style-loader!css-loader?modules!stylus-loader"},
            {test: /\.png/, loader: "file-loader?mimetype=image/png"},
            {test: /\.jpg/, loader: "file"},
            {test: /\.gif/, loader: "file"},
            {test: /\.mp3/, loader: "file"},
            {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ]
  },

  debug: true,
  profile: true,
  eslint: {
    failOnError: false
  }
};
