let webpack = require('webpack');
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: ['webpack-hot-middleware/client?reload=true','webpack/hot/only-dev-server','./src/main.js'],
  output: {
    path: path.resolve(__dirname,'dist'),
    pathinfo: false,
    publicPath: './',
    filename: '[id].[hash].js',
    chunkFilename: '[name]-[id]-[hash].[chunkhash].js',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json',
  },
  resolve: {
    alias: {
      Root: './',
    },
    extensions: [ '.js', '.json', '.less', '.css' ]
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    new HtmlWebpackPlugin({
      title: 'title',
      // inject: true, // body head false true
      template: './index.html',
      filename: 'index.html',
      // minify: true,
      // hash: false,
      // cache: true,
      // chunks: config.entry.main,
      // excludeChunks
      // chunksSortMode
    })
    
  ],
  module: {
    rules: [
      { 
        test: /.(js|jsx|json)$/i, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
      }
    ]
  }
}