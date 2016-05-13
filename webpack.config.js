var path = require('path');

module.exports = {
  entry: {
    app: './client/uncompiledJS/app.js',
  },

  output: {
    path: path.resolve('build'),
    filename: 'js/[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
    ],
  },
};
