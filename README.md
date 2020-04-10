# git-stat-viewer [![Build Status](https://img.shields.io/circleci/project/cookx/git-stat-viewer/master.svg)](https://circleci.com/gh/cookx/git-stat-viewer) [![npm package](https://img.shields.io/npm/v/git-stat-viewer.svg)](https://www.npmjs.com/package/git-stat-viewer)

Git 代码提交量统计工具，支持命令行和视图操作

## 功能概览

- [x] 代码行数统计
- [x] 文件格式美化
- [x] 计算总行数
- [x] 添加日期限制
- [x] 支持分支切换
- [x] 封装命令行工具
- [ ] 视图操作

## 快速上手

1. 全局安装

```bash
npm i git-stat-viewer -g
```

<!-- 2. 添加可执行权限

由于程序中集成了`shell`,所以需要手动开启`index.sh`可执行权限

```bash
cd git-stat
chmod +x ./index.sh
``` -->

2. 执行统计

在 `node >= v8.9`环境中，执行
```bash
gitstat [配置文件/git仓库地址/git本地仓库目录] [结果输出文件]
```

指定统计时间

```bash
gitstat [配置文件/git仓库地址/git本地仓库目录] [结果输出文件] --since YYYY-MM-DD --until YYYY-MM-DD
```

执行完成之后，在 `git-stat/dist.md` 中查看统计结果

一个将输出结果在[typora](https://typora.io/)中展示的🌰：

user name | added lines | removed lines | total lines
---- | --- | --- | ---
Ling | 354 | 55 | 299
Ling Z | 1024 | 99 | 925

## 配置说明
在`config.js`中，有如下参数可定义：

param | type | comment
---- | --- | ---
repositories | Array | Git仓库信息
repositories.address | String | Git远程仓库地址
repositories.branch | String | Git分支
startDate | String | 统计的开始时间，格式`YYYY-MM-DD`
endDate | String | 统计的结束时间，格式`YYYY-MM-DD`
distFile | String | 输出的文件名，默认`dist.md`

## License

[MIT](http://opensource.org/licenses/MIT)