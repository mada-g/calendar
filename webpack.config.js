var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


/*************************
**************************
**  LOADERS DEFINITION  **
**************************
*************************/

var jsxLoader = { test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] };

var styleLoader = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: ExtractTextPlugin.extract({fallback: "style-loader", publicPath: "/public", use:[
    {loader: "css-loader"},
    {loader: "sass-loader"}
  ]})
};


/**************************************************
***************************************************
 MAIN CONFIG **************************************
***************************************************
**************************************************/


module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './src/client/client.jsx'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },

  module: {
    rules: [jsxLoader, styleLoader]
  },

  plugins: [
    new ExtractTextPlugin({filename: "style.css", disable:true, allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({ name: "common" }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true
  }
};
