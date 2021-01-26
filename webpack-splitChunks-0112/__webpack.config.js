const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'development',
    entry: {
        a: './src/a.js',
        b: './src/b.js'
    },
    plugins: [new BundleAnalyzerPlugin()],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    // minSize: 80000,
                    chunks: 'all', // 这里是我们修改的地方，async|initial|all
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    }
};
