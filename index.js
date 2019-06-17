/**
 * Git 代码行数统计（以人为维度）
 * todo: 支持分支切换
 */

const fs = require('fs')
const path = require('path')
const execFileSync = require('child_process').execFileSync
const execSync = require('child_process').execSync

// 从配置读取代码仓库、开始日期、结束日期、输出文件等信息
const config = require('./config')
const gitProjects = config.gitProjects
const startData = config.startData
const endData = config.endData
const distFile = config.distFile

const distFilePath = path.join(__dirname, distFile)
fs.writeFileSync(distFilePath, '# 代码提交量统计\n## 项目详情')

// 代码行数总计（以人为维度统计）
var totalStastsObj = {'## 汇总': {}}

// 循环获取git代码提交情况
gitProjects.forEach((item, index) => {
	const dirName = item.address.replace(/^.*\:\d+\/((\w|\-|\/)+)\.git/g, '$1')
	const changeName = './.projects/' + dirName
	item.branch = item.branch || 'master'

	// 拉取更新代码仓库，切换分支
	if (fs.existsSync(path.join(__dirname, changeName))) {
		execSync(`cd ${changeName}; git checkout ${item.branch};git pull origin ${item.branch};`)
	} else {
		execSync(`git clone -b ${item.branch} ${item.address} ${changeName};`)
	}

	// 统计代码
	const stastsData = execFileSync(
		path.join(__dirname, './index.sh'), [ startData, endData], {
			cwd: path.join(__dirname, changeName),
		}).toString()

	// 组装对象
	const stastsObj = eval("(" + stastsData + ")")
	const distObj = {}
	distObj[dirName] = stastsObj

	// 打印输出
	dist(distObj)

	// 生成总计对象
	Object.keys(stastsObj).forEach(element => {
		if (!totalStastsObj['## 汇总'][element]) {
			totalStastsObj['## 汇总'][element] = [0, 0, 0]
		}
		totalStastsObj['## 汇总'][element][0] += stastsObj[element][0] || 0
		totalStastsObj['## 汇总'][element][1] += stastsObj[element][1] || 0
		totalStastsObj['## 汇总'][element][2] += stastsObj[element][2] || 0
	})

	// 重置&清理
	// execSync(`rm -rf ${changeName}`)
})

// 输出每人代码总行数
dist(totalStastsObj)

// 打印输出md
function dist (obj) {
	for (let key in obj) {
		// 打印当前项目统计
		fs.appendFileSync(distFilePath, `\n${key}：\n` +
		'user name | added lines | removed lines | total lines\n' +
		'---- | --- | --- | ---\n')

		Object.keys(obj[key]).forEach(element => {
			// 去除提交量为0的
			if (obj[key][element][0] === obj[key][element][1]  && obj[key][element][1] === obj[key][element][2] && obj[key][element][0] === 0) return
			fs.appendFileSync(distFilePath, `${element} | ${obj[key][element][0] || 0} | ${obj[key][element][1] || 0} | ${obj[key][element][2] || 0}\n`)
		})
	}
}