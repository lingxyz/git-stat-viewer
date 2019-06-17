#!/bin/bash

# git 代码行数统计（以人为维度）

rm -rf "dist.md"
gitProjects=(
	'git@github.com:zhanglingco/Blog.git'
	'git@github.com:zhanglingco/coder-interview.git'
);

for(( i=0;i<${#gitProjects[@]};i++)) do
	git clone ${gitProjects[i]};

	dirName=$(basename ${gitProjects[i]} | awk -F "." '{print $1}')
	echo ${gitProjects[i]};
	printf 'user name | added lines | removed lines | total lines\n---- | --- | --- | ---\n'

	cd $dirName;
	git log --format='%aN' | sort -u |
	while read name;
	do
		echo -en "$name | ";
		git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%s | %s | %s\n", add, subs, loc }' -;
	done;
	printf "\n";

	# 重置&清理
	cd ..;
	rm -rf $dirName;
done >> "dist.md";