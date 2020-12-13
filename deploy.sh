#!/usr/bin/env bash

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
mvn clean package docker:build

# 将创建的容器拷贝一份,并命名为registry.cn-beijing.aliyuncs.com/hezhijian/my-blog-back
docker tag springboot/my-blog:latest registry.cn-beijing.aliyuncs.com/hezhijian/my-blog-back

# 上传到阿里云容器镜像服务
sudo docker push registry.cn-beijing.aliyuncs.com/hezhijian/my-blog-back:latest

# 删除创建的容器
docker image rm springboot/my-blog:latest
docker image rm registry.cn-beijing.aliyuncs.com/hezhijian/my-blog-back
