const path = require('path')
const MyPlugin = require('./plugins/MyPlugin.js');
const FileListPlugin = require('./plugins/FileListPlugin.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const PrefetchPlugin = require('./plugins/PrefetchPlugin.js');
const ExtractMapPlugin = require('./plugins/ExtractMapPlugin.js');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: './src/index.js',
    test: './src/test.js'
  },
  output: {
    publicPath: 'http://www.example.com/js/'
  },
  plugins: [
    // new MyPlugin({flag: true}),
    // new FileListPlugin(),
    // new HtmlWebPackPlugin(),
    // new PrefetchPlugin()

    
    // 指定 chunks=[index]，index 中有引入 lazy -> prefetch lazy.js
    new HtmlWebPackPlugin({chunks: ['index'], filename: 'index.html'}),

    // 未指定 chunk，chunks='all'，test 和 index 都会被包含，index 中有引入 lazy -> prefetch lazy.js
    new HtmlWebPackPlugin({filename: 'no-chunk.html'}),

    // 指定 chunks=[test]，test 中没有 prefetch 的内容，所以 html 应该不会包含 prefetch link
    new HtmlWebPackPlugin({chunks: ['test'], filename: 'test.html'}),

    new PrefetchPlugin({options: true}),

    new ExtractMapPlugin()
  ]
}