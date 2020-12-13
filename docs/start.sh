#!/usr/bin/env bash

# 确保脚本抛出遇到的错误
set -e

# 拉取前端镜像
docker pull registry.cn-beijing.aliyuncs.com/hezhijian/my-blog-back
# 停止前端容容器
docker stop blog-back
# 删除前端容器
docker rm blog-back
# 删除原来的前端镜像
docker image rm blog-back
# 将拉取的前端镜像更改名字
docker tag registry.cn-beijing.aliyuncs.com/hezhijian/my-blog:latest blog-back
# 启动
docker run --name blog-back -p 8080:8080 -d --link mysql:mysql my-blog-back
# 删除之前拉取的前端镜像
docker image rm registry.cn-beijing.aliyuncs.com/hezhijian/my-blog-back
