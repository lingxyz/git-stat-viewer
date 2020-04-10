/**
 * 配置信息读取
 * args[0] git remote address, git 仓库, 配置文件 json/yaml
 * args[1] 输出结果的文件路径
 * args[2] 开始日期
 * args[3] 结束日期
 */
const fs = require('fs')
const path = require('path')
const read = require('read-metadata')

module.exports = function(program) {
  // config 类型判断
  let config = {}, repositories
  if (/\.(json|yaml)$/g.test(program.args[0])) {
    config = read.sync(path.join(process.cwd(), program.args[0]))
    repositories = config.repositories
  } else if (/\.git$/g.test(program.args[0])) {
    repositories = [{address: program.args[0]}]
  } else {
    // 查找目录下的git地址/copy当前目录
  }
  const distFile = path.join(process.cwd(), config.distFile  || program.args[1] || 'dist.md')
  const startDate = config.since || program.since
  const endDate = config.until || program.until

  const results = { repositories, distFile, startDate, endDate }

  fs.writeFileSync(path.join(__dirname, '../.cache-config.json'), JSON.stringify(results, '', 2))

  return results
}