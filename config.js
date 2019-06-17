const gitProjects = [
	{address: 'git@github.com:zhanglingco/Blog.git'},
	{address: 'git@github.com:zhanglingco/coder-interview.git'}
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