const fs = require("fs");
const sourceMap = require("source-map"); // mozilla/source-map库
const rawSourceMap = JSON.parse(
  // 打包后的sourceMap文件
  fs.readFileSync("./dist-prod/es5.js.map").toString()
);

const errorPos = {
  // 上图中的错误位置
  line: 1,
  column: 11771,
};

async function main() {
   // 获取sourceMap consumer，我们可以通过传入打包后的代码位置来查询源代码的位置
  const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);

   // 获取 出错代码 在 哪一个源文件及其对应位置
  const originalPosition = consumer.originalPositionFor({
    line: errorPos.line,
    column: errorPos.column,
  });

  // 根据源文件名寻找对应源文件
  const sourceIndex = consumer.sources.findIndex(
    (item) => item === originalPosition.source
  );
  const sourceContent = consumer.sourcesContent[sourceIndex];
  const contentRowArr = sourceContent.split("\n"); //切分

  // 接下来根据行和列可获取更加具体的位置
  console.log(`line: ${originalPosition.line}`);
  console.log(contentRowArr[originalPosition.line - 2]);
  console.log(contentRowArr[originalPosition.line - 1]);
  console.log(contentRowArr[originalPosition.line]);

  consumer.destroy(); // 使用完后记得destroy
}

main();
