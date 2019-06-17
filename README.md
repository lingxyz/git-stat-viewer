# git-stasts
Git 代码提交量统计工具

### 功能概览

- [x] 代码行数统计
- [x] 文件格式美化
- [x] 计算总行数
- [x] 添加日期限制
- [x] 支持分支切换

### 快速上手

1. 将代码克隆到本地

```bash
git clone https://github.com/zhanglingco/git-stasts.git
```

2. 添加可执行权限

由于程序中集成了`shell`,所以需要手动开启`index.sh`可执行权限

```bash
cd git-stasts
chmod +x ./index.sh
```

3. 执行统计

在 `node >= v8.9`环境中，执行
```bash
node git-stasts/index.js
```

执行完成之后，在 `git-stasts/dist.md` 中查看统计结果

一个将输出结果在[typora](https://typora.io/)中展示的🌰：

user name | added lines | removed lines | total lines
---- | --- | --- | ---
Ling | 354 | 55 | 299
Ling Z | 1024 | 99 | 925

### 配置说明
在`config.js`中，有如下参数可定义：

param | type | comment
---- | --- | --- 
repositories | Array | Git仓库信息 
repositories.address | String | Git远程仓库地址
repositories.branch | String | Git分支
startData | String | 统计的开始时间，格式`YYYY-MM-DD` 
endData | String | 统计的结束时间，格式`YYYY-MM-DD` 
distFile | String | 输出的文件名，默认`dist.md`