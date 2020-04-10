/**
 * 代码行数统计
 * return Object: key:username value: code line
 */
const path = require('path')
const execFileSync = require('child_process').execFileSync

module.exports = function(repoPath, startDate, endDate) {
	const statData = execFileSync(
		path.join(__dirname, './index.sh'), [startDate, endDate], {
			cwd: repoPath
    }).toString()

    return eval("(" + statData + ")")
}