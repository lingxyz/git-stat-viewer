// 代码仓库列表
const gitProjects = [
	{address: 'ssh://git@10.211.62.41:1022/framework/kits/dev-tools.git'},
	{address: 'ssh://git@10.211.62.41:1022/framework/micro-services/auth-api.git'},

]

// 开始日期
const startData = '2019-6-1';
// 结束日期
const endData = '2019-6-30';
// 输出文件
const distFile = 'dist.md';

module.exports = {
	gitProjects, startData, endData, distFile
}