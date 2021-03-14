#!/usr/bin/env bash

# 确保脚本抛出遇到的错误
set -e

# 拉取前端镜像
docker pull registry.cn-beijing.aliyuncs.com/hezhijian/my-blog
# 停止前端容容器
docker stop blog
# 删除前端容器
docker rm blog
# 删除原来的前端镜像
docker image rm my-blog
# 将拉取的前端镜像更改名字
docker tag registry.cn-beijing.aliyuncs.com/hezhijian/my-blog:latest my-blog
# 启动
docker run --name blog -p 4200:80 -d my-blog
# 删除之前拉取的前端镜像
docker image rm registry.cn-beijing.aliyuncs.com/hezhijian/my-blog
