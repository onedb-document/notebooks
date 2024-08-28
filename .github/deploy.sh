#!/bin/bash

echo '开始执行部署任务'

rm -rf ~/gh-projects/notebooks

git clone "https://github.com/onedb-document/notebooks.git" ~/gh-projects/notebooks

echo '仓库准备完毕'

cd ~/gh-projects/notebooks

docker-compose up -d

echo '运行成功'
