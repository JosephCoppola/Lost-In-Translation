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
        include: [
          path.resolve(__dirname, 'app'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
