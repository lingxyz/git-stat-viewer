/**
 * 配置信息读取
 * args[0] git remote address, git 仓库, 配置文件
 * args[1] 输出结果的文件路径
 * args[2] 开始日期
 * args[3] 结束日期
 */
const path = require('path')

module.exports = function(program) {
  // path.relative('../', process.cwd())
  console.log(process.cwd(), 11111)

  // config 类型判断
  let config = {}, repositories
  if (/\.(js|json|yaml)$/g.test(program.args[0])) {
    config = require(path.join(process.cwd(), program.args[0]))
    repositories = config.repositories
  } else if (/\.git$/g.test(program.args[0])) {
    repositories = [{address: program.args[0]}]
  } else {
    // 查找目录下的git地址/copy当前目录
  }
  const distFile = path.join(process.cwd(), config.distFile  || program.args[1] || 'dist.md')
  const startDate = config.startDate || program.since
  const endDate = config.endDate || program.until

  return { repositories, distFile, startDate, endDate }
}