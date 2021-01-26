const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './test/index.js',
  module: {
      rules: [
          {
              test: /\.md$/,
              use: [
                  'html-loader',
                  {
                      loader: require.resolve('./src/index.js'),
                      options: {
                          simplifiedAutoLink: true,
                          tables: true
                      }
                  }
              ]
          }
      ]
  },
  plugins: [
    new HtmlWebPackPlugin()
  ]
};