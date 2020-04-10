/**
 * 输出结果文件，markdown
 */
const fs = require('fs')

module.exports = function(obj, distFile) {
	for (let key in obj) {
		// 打印当前项目统计
		fs.appendFileSync(distFile, `\n${key}：\n` +
		'user name | added lines | removed lines | total lines\n' +
		'---- | --- | --- | ---\n')

		Object.keys(obj[key]).forEach(element => {
			// 去除提交量为0的
			if (obj[key][element][0] === obj[key][element][1]  && obj[key][element][1] === obj[key][element][2] && obj[key][element][0] === 0) return
			fs.appendFileSync(distFile, `${element} | ${obj[key][element][0] || 0} | ${obj[key][element][1] || 0} | ${obj[key][element][2] || 0}\n`)
		})
	}
}