#!/bin/bash

git log --format='%aN' | sort -u |
while read name;
do
	echo -en "'$name': ";
	git log --author="$name" --pretty=tformat: --since ="$1" --until="$2" --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "[%s, %s, %s],\n", add, subs, loc }' -;
done;