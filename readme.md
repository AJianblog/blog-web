## 后端项目发布

### 引入docker构建依赖

在`pom.xml`文件中引入打包镜像的插件

```xml
<plugin>
    <groupId>com.spotify</groupId>
    <artifactId>docker-maven-plugin</artifactId>
    <version>1.0.0</version>
    <configuration>
        <imageName>${docker.image.prefix}/${project.artifactId}</imageName>
        <dockerDirectory>src/main/resources/docker</dockerDirectory>
        <resources>
            <resource>
                <targetPath>/</targetPath>
                <directory>${project.build.directory}</directory>
                <include>${project.build.finalName}.jar</include>
            </resource>
        </resources>
    </configuration>
</plugin>
```

`docker.image.prefix`: 定义的一个变量名

```xml
<properties>
    <docker.image.prefix>springboot</docker.image.prefix>
</properties>
```

在`src/main/resources/docker`目录文件中新建一个`Dockerfile`文件

```dockerfile
FROM openjdk:11
COPY my-blog-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

- 将生成的`jar`文件复制到镜像中并从命名为`app.jar`

- 使用java命令启动jar包

执行`mvn clean package docker:build`生成镜像，在把镜像上传到阿里云镜像服务中`docker tag springboot/my-blog:latest registry.cn-beijing.aliyuncs.com/hezhijian/my-blog-back`

通过ssh登录自己的服务器，拉取自己上传到阿里云服务的容器，启动容器，**这里有个小坑，需要关联mysql的docker，不然无法访问数据库**

```bash
docker run --name blog-back -p 8080:8080 -d --link mysql:mysql my-blog-back
```

- `--link mysql:mysql`: 第一个mysql是启动的mysql容器的名称，通过`docker ps`可以查看启动容器的名称,第二个mysql是在springBoot项目中数据库配置的mysql地址,相当于hostname(127.0.0.1),也就意味着连接数据库的地址不能是127.0.0.1，需要改为myslq

```yaml
spring:
  datasource:
    url: jdbc:mysql://mysql:3306/myBlog?characterEncoding=utf-8&serverTimezone=GMT%2B8
```

根据自己取的名称改为相应的名称

## 前端项目发布

### 在本地将docker打包好并上传到阿里云镜像

```bash
# 进入前端项目根目录
ng build --prod

# 本地创建docker镜像
docker build -f Dockerfile -t my-blog .

# IMAGE ID为镜像的id, TAG为版本号,可以不写,不写默认为latest
docker tag <IMAGE ID> registry.cn-beijing.aliyuncs.com/hezhijian/my-blog:[TAG]

# 提交docker到阿里云镜像
docker push registry.cn-beijing.aliyuncs.com/hezhijian/my-blog:[TAG]
```

### 登录自己的服务器

```bash
ssh user@IPAddress

# 将上传的镜像pull下来
docker pull registry.cn-beijing.aliyuncs.com/hezhijian/my-blog

# 名字太长了,换个名字
docker tag registry.cn-beijing.aliyuncs.com/hezhijian/my-blog:latest my-blog

# 启动镜像
docker run --name blog -p 4200:80 -d my-blog
```

## FAQ

### springBoot使用docker启动之后无法访问数据库

参考文章: [https://github.com/xiaozefeng/docker-guide/issues/2](https://github.com/xiaozefeng/docker-guide/issues/2)

### 关联之后还是无法访问数据库

- 进入springBoot容器，看能否ping通mysql容器

```shell script
# 查看docker的CONTAINER ID
docker ps
# 选择springboot的CONTAINER ID进入容器，例如 docker exec -it 761d69a14708 /bin/bash
docker exec -it [CONTAINER ID] /bin/bash
#这里的mysql需要根据上面的第二个mysql相同
ping mysql
```

如果可以ping通，name容器之间是可以互相访问的，检查`application.yml`配置是否更改了

```yaml
spring:
  datasource:
    # hostname 根据--link mysql:mysql来确定
    url: jdbc:mysql://mysql:3306/myBlog?characterEncoding=utf-8&serverTimezone=GMT%2B8
```