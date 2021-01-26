const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const fsExtra = require('fs-extra')

class ExtractMapPlugin {
  apply(compiler) {
      compiler.hooks.done.tap('ExtractMapPlugin', () => {
          // 过滤 source-map
          const mapFiles = fs.readdirSync(compiler.outputPath).filter(file => {
            const extName = path.extname(file)
            return /(.*)\.(map)/.test(file)
          })

          // 在打包路径下创建 sourceMap 文件夹
          const mapFilePath = path.join(compiler.outputPath, 'sourceMap')

          if (fs.existsSync(mapFilePath)) {
            rimraf(path.join(mapFilePath, '/*'), () => {})
          } else {
            fs.mkdirSync(mapFilePath)
          }

          // 将 map 文件移动到同级的 sourceMap 文件夹内
          mapFiles.forEach(file => {
            const sourcePath = path.join(compiler.outputPath, file)
            const targetPath = path.join(mapFilePath, file)
            fsExtra.move(sourcePath, targetPath, { overwrite: true })
          })
      });
  }
}

module.exports = ExtractMapPlugin;