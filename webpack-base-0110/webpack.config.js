const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const EslintFriendlyFormatter = require('eslint-friendly-formatter')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')


const isProd = process.env.NODE_ENV === 'production'
const analyze = process.env.ANALYZE


const plugins = [
  new HtmlWebPackPlugin({
    template: 'index.html'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
  new WebpackManifestPlugin()
]

if (analyze) {
  plugins.push(new BundleAnalyzerPlugin())
}


module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    es5: './src/es5/index.js',
    es6: './src/es6/index.js'
  },
  output: {
      path: path.resolve(__dirname, isProd ? 'dist-prod' : 'dist-dev'),
      filename: '[name].js',
      // 所有打包产物即单个文件都会从该路径拿文件
      // publicPath: 'http://shaopy.com/assets/'
  },
  plugins: plugins,
  devtool: isProd ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  optimization: {
    runtimeChunk: 'single'
  },
  devServer: {
    // 配置DevServer HTTP服务器的文件根目录,默认情况下为当前执行目录，所以一般不必设置它
    // contentBase: path.join(__dirname, isProd ? 'dist-prod' : 'dist-dev'),
    port: 9000,
    open: true,
    hot: true,
    inline: true,
    clientLogLevel: 'warning',
    overlay: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 增加cacheDirectory:true项，开启缓存，在初次打包后再次打包，如果JS文件未发生变化，可以直接使用初次打包后的缓存文件，避免了二次转码，有效提高打包速度
        use: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: {// 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: EslintFriendlyFormatter // 指定错误报告的格式规范
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50 * 1024
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre'
      },
      {
        // 文件解析
        test: /\.(eot|woff|ttf|woff2|appcache|mp4|pdf)(\?|$)/,
        loader: 'file-loader',
        query: {
            // 这么多文件，ext不同，所以需要使用[ext]
            name: 'assets/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
};





