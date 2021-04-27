# 溯源商城app前端

## 整体介绍

`trace mall` 项目致力于打造一个完整的商品溯源+电商系统。包括溯源系统和商城系统。
采用前后端分离方式开发，后端基于SprintBoot+MyBatis实现，前端基于vue实现。

## 代码地址

【溯源系统】

* 溯源码管理后端： https://github.com/lanchengyu/trace_code_backend

* 溯源码管理前端： https://github.com/lanchengyu/trace_code_admin_frontend

* 溯源码数据展示前端： https://github.com/lanchengyu/trace_code_data_frontend

【商城系统】

* 溯源商城后端： https://github.com/lanchengyu/trace_mall_backend

* 溯源商城管理前端： https://github.com/lanchengyu/trace_mall_admin_frontend

* 溯源商城app前端： https://github.com/lanchengyu/trace_mall_app_frontend

## 项目演示

### 体验地址

商品溯源页面(手机版)： [http://47.96.150.2/shop/#/batch/batchDetail?id=994B8240B731F691430F04312CD95FFC](http://47.96.150.2/shop/#/batch/batchDetail?id=994B8240B731F691430F04312CD95FFC)

商城页面(手机版)： [http://47.96.150.2/shop](http://47.96.150.2/shop) （账号：lb， 密码：123456）

扫码展示页面(pc版)：[http://47.96.150.2/view](http://47.96.150.2/view)（账号：admin， 密码：admin123）

溯源管理页面：暂不开放

商城管理页面：暂不开放

一物一码体验：该码用于贴在商品上，供用户扫码鉴别真假，扫码后会进入商品溯源页面，可用浏览器扫码体验。

![二维码图片.jpg](https://github.com/lanchengyu/trace_mall_app_frontend/blob/main/document/resource/huangtao.jpg)

### 页面展示

若图片加载不出来，可尝试修改dns服务器为: 8.8.8.8(首选服务器); 8.8.4.4（备选服务器）

用户页面：

![用户页面演示.gif](https://github.com/lanchengyu/trace_mall_app_frontend/blob/main/document/resource/trace-mall.gif)

扫码统计页面：

![扫码统计页面.png](https://github.com/lanchengyu/trace_mall_app_frontend/blob/main/document/resource/trace_data.png)

溯源码管理页面：

![溯源码管理页面.png](https://github.com/lanchengyu/trace_mall_app_frontend/blob/main/document/resource/trace_code_admin.png)


## 详细介绍

### 溯源系统

* 权限管理： 包含用户角色管理和角色权限管理，此外每个企业可独立管理自己的企业信息和商品信息。
* 商品管理： 企业用户可以创建本企业的商品，并进行管理。
* 批次管理： 可以为商品创建生产批次，并录入生产信息，包括生产环节、负责人、检验报告等。
* 防伪码管理： 采用一物一码技术，为每件商品生成唯一id，并用对称加密方式进行加密。
* 扫码验证： 显示扫码次数，首次扫码即表明该商品未被使用。
* 区块链验证： 扫码后可在页面进行区块链验证，查看上链信息。
* 扫码展示： 展示商品在各个地区的扫码次数。
* 商城链接： 扫码后可从扫码界面进入商城进行购买。

### 商城系统

#### 商城后台管理
溯源商城后台基于`mall`项目进行开发，增加了物流查询、支付宝支付、微信支付等功能。目前在锁定库存时并没有加锁，因此高并发情况下存在超卖的情况，如果不允许超卖，可以考虑加入分布式锁。

【代码结构】

``` lua
mall
├── mall-common -- 工具类及通用代码
├── mall-mbg -- MyBatisGenerator生成的数据库操作代码
├── mall-admin -- 后台商城管理系统接口
├── mall-search -- 基于Elasticsearch的商品搜索系统
├── mall-portal -- 前台商城系统接口
└── mall-demo -- 框架搭建时的测试代码
```

【相关技术】

技术 | 说明 | 官网
----|----|----
Spring Boot | 容器+MVC框架 | [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
Spring Security | 认证和授权框架 | [https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)
MyBatis | ORM框架  | [http://www.mybatis.org/mybatis-3/zh/index.html](http://www.mybatis.org/mybatis-3/zh/index.html)
MyBatisGenerator | 数据层代码生成 | [http://www.mybatis.org/generator/index.html](http://www.mybatis.org/generator/index.html)
PageHelper | MyBatis物理分页插件 | [http://git.oschina.net/free/Mybatis_PageHelper](http://git.oschina.net/free/Mybatis_PageHelper)
Swagger-UI | 文档生产工具 | [https://github.com/swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui)
Hibernator-Validator | 验证框架 | [http://hibernate.org/validator/](http://hibernate.org/validator/)
Elasticsearch | 搜索引擎 | [https://github.com/elastic/elasticsearch](https://github.com/elastic/elasticsearch)
RabbitMq | 消息队列 | [https://www.rabbitmq.com/](https://www.rabbitmq.com/)
Redis | 分布式缓存 | [https://redis.io/](https://redis.io/)
MongoDb | NoSql数据库 | [https://www.mongodb.com/](https://www.mongodb.com/)
Docker | 应用容器引擎 | [https://www.docker.com/](https://www.docker.com/)
Druid | 数据库连接池 | [https://github.com/alibaba/druid](https://github.com/alibaba/druid)
OSS | 对象存储 | [https://github.com/aliyun/aliyun-oss-java-sdk](https://github.com/aliyun/aliyun-oss-java-sdk)
JWT | JWT登录支持 | [https://github.com/jwtk/jjwt](https://github.com/jwtk/jjwt)
LogStash | 日志收集 | [https://github.com/logstash/logstash-logback-encoder](https://github.com/logstash/logstash-logback-encoder)
Lombok | 简化对象封装工具 | [https://github.com/rzwitserloot/lombok](https://github.com/rzwitserloot/lombok)

### 商城前端 web app

采用 vue2.0+vuex+axios 开发

【相关技术】

技术 | 说明 | 官网
----|----|----
Vue | 前端框架 | [https://vuejs.org/](https://vuejs.org/)
Vue-router | 路由框架 | [https://router.vuejs.org/](https://router.vuejs.org/)
Vuex | 全局状态管理框架 | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)
Axios | 前端HTTP框架 | [https://github.com/axios/axios](https://github.com/axios/axios)

# 参考
https://github.com/macrozheng/mall
 
https://github.com/Mynameisfwk/vivo-shop
 
https://github.com/febsteam/FEBS-Vue

https://github.com/SimonZhangITer/DataVisualization