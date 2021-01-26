const showdown = require('showdown');
const loaderUtils = require('loader-utils');

module.exports = function(content) {
    // 获取 options
    const options = loaderUtils.getOptions(this);
    // 设置 cache
    this.cacheable();
    // 初始化 showdown 转换器
    const converter = new showdown.Converter(options);
    // 处理 content
    content = converter.makeHtml(content);
    // 返回结果
    this.callback(null, content);
};