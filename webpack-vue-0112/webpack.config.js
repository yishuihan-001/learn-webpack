const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    // contentBase: path.join(__dirname, './src/'),
    publicPath: '/',
    host: '127.0.0.1',
    port: 3000
  },
  resolve: {
      alias: {
          vue$: 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader'
              }
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader'
          }
      ]
  },
  plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html'
      })
  ]
};