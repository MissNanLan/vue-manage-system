/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const basepath = path.resolve(__dirname, "../src");

const dirName = process.argv[2];
if (!dirName) {
  console.error("请输入文件名");
  console.error(`实例: npm run tep ${dirName}`);
  return;
}

if (!dirName.match(/[a-z]+[A-Z]{1}[a-z]+/g)) {
  console.error("请输入驼峰式命名");
  console.error(`实例: npm run tep helloWorld`);
  return;
}
// helloWorld => hello-world
function convertKebab(str) {
  for (let i = 0; i < str.length; i++) {
    var s = str.charAt(i);
    if (s.match(/[A-Z]+/g)) {
      return i;
    }
  }
}

const _index = convertKebab(dirName);
let arr = [];
arr = dirName.split("");
arr.splice(_index, 0, "-");
const kebabName = arr.join("");

/**
 * vue 模板
 */

const VueTep = `
<template>
    <div class="${kebabName}">
    </div>
</template>

<script src='./index.js'>

</script>

<style lang="less">
@import './index.less';
</style>`;

/**
 * less 模板
 */
const LessTep = `
   @import '@/less/index.less'
`;
/**
 * script 模板
 */
const ScriptTep = `
export default {
    name: "${dirName}"
}`;

/**
 * store 模板
 */
const StoreTep = `
export default {
    namespaced: true,
    state: {
      name: "${dirName}Moudle"
    },
    mutations: {},
    actions: {}
  };
`;
fs.mkdirSync(`${basepath}/views/${dirName}`); // 新建文件夹
process.chdir(`${basepath}/views/${dirName}`); // 更改目录
fs.writeFileSync("index.vue", VueTep);
fs.writeFileSync("index.js", ScriptTep);
fs.writeFileSync("index.less", LessTep);

fs.mkdirSync(`${basepath}/views/${dirName}/store`); // 新建文件夹
process.chdir(`${basepath}/views/${dirName}/store`); // 更改目录
fs.writeFileSync("index.js", StoreTep);

process.exit(0);
