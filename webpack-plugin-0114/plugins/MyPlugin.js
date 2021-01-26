// class MyPlugin {
//   constructor(obj) {
//       // 自定义配置
//       this.options = obj;
//       console.log(this.options);
//   }
//   apply(compiler) {
//       compiler.hooks.done.tap('my-plugin', () => {
//           console.log('Hello World!');
//       });
//   }
// }
// module.exports = MyPlugin;

class MyPlugin {
  apply(compiler) {
      compiler.hooks.emit.tapPromise('HelloAsyncPlugin', compilation => {
          // 返回一个 Promise，在我们的异步任务完成时 resolve……
          return new Promise((resolve, reject) => {
              setTimeout(function() {
                  console.log('异步工作完成……');
                  resolve();
              }, 1000);
          });
      });
    // compiler.plugin('done', () => {
    //     console.log('异步工作完成……!!!!!!!!!!!!!!!!');
    // })
  }
}

module.exports = MyPlugin;