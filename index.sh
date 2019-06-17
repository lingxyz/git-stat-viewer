#!/bin/bash
gitProjects=(
	'http://10.211.62.41:82/c4i-microservices/aws-c4i-bi-service.git'
	'http://10.211.62.41:82/c4i-microservices/aws-c4i-bi-service-api.git'
);

for(( i=0;i<${#gitProjects[@]};i++)) do
	git clone ${gitProjects[i]};

	dirName=$(basename ${gitProjects[i]} | awk -F "." '{print $1}')
	echo ${gitProjects[i]};
	cd $dirName;
	git log --format='%aN' | sort -u |
	while read name;
	do echo -en "$name\t";
		git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -;
	done;

	cd ..
done;