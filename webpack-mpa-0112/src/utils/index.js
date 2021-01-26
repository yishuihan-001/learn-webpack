const path = require('path');
const globby = require('globby');

const getEntry = (exports.getEntry = () => {
    // 异步方式获取所有的路径
    const paths = globby.sync('./pages/*.js', {
        cwd: path.join(__dirname, './src')
    });
    const rs = {};
    paths.forEach(v => {
        // 计算 filename
        const name = path.basename(v, '.js');
        let p = path.join('./src', v);
        if (!p.startsWith('.')) {
            // 转成相对地址
            p = './' + p;
        }

        rs[name] = p;
    });
    return rs;
});

// 输出内容
console.log(getEntry());
// 下一步就是遍历entry对象，然后生成 html-webpack-plugins 的数组了：

const HtmlWebPackPlugin = require('html-webpack-plugin');

exports.getHtmlWebpackPlugins = () => {
    const entries = getEntry();
    return Object.keys(entries).reduce((plugins, filename) => {
        plugins.push(
            new HtmlWebPackPlugin({
                template: entries[filename],
                filename: `${filename}.html`,
                chunks: [filename]
            })
        );
        return plugins;
    }, []);
};



// ***************

const {getEntry, getHtmlWebpackPlugins} = require('./scripts/utils');

module.exports = {
    mode: 'development',
    // getEntry(),
    plugins: [
        // ...getHtmlWebpackPlugins()
    ]
};
