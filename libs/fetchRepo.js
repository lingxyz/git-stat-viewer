/**
 * 获取git仓库，放进缓存目录
 * return {repoName} String 仓库名
 * return {localRepoPath} String 仓库缓存路径
 */
const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

// 缓存目录
const cacheDir = '../.projects/'

module.exports = function(address, branch) {
	const repoName = address.replace(/^.*\:\d+\/((\w|\-|\/)+)\.git/g, '$1')
	const localRepoPath = path.join(__dirname, cacheDir + repoName)
	branch = branch || 'master'

	// 拉取更新代码仓库，切换分支
	if (fs.existsSync(localRepoPath)) {
		execSync(`cd ${localRepoPath}; git checkout ${branch};git pull origin ${branch};`)
	} else {
		execSync(`git clone -b ${branch} ${address} ${localRepoPath};`)
  }

  return { repoName, localRepoPath }
}