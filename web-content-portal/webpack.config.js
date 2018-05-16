const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 


module.exports = {
  entry: './src/index.js',
  output: {
  	path: __dirname + '/dist',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  watch: true,
  watchOptions: {
	  aggregateTimeout: 300,
	  poll: false
  },
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src',  //source of static assets
      watchContentBase: true, // initiate a page refresh if static content changes
      port: 8080, // port to run dev-server
  } 
};