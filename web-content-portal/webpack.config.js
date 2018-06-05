const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mime=require('mime-types');


module.exports = {
  entry: ['./app.js',
          './src/app/assets/static/constants.js',
          './src/app/components/landing.component.js',
          './src/app/components/header.component.js',
          './src/app/components/home.component.js',
          './src/app/components/student.component.js',
          './src/app/components/class.component.js',
          './src/app/components/assignment.component.js',
          './src/app/components/user.component.js',
          './src/app/components/createassignment.component.js'
         ],
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist',
    // path: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  devServer: {  // configuration for webpack-dev-server
      // contentBase: './src',  //source of static assets
      watchContentBase: true, // initiate a page refresh if static content changes
      port: 3000, // port to run dev-server
  } 
};