# Vue.js开源的CNode社区

> vue.js编写的cnode社区

博客地址：http://www.qirenji.info/2017/08/01/Vue.js开源的CNode社区/

``` bash
npm install -----安装依赖
npm run dev -----运行
npm run build -----打包
node prod.server.js -----打包后运行
```

## 前言
vue练习项目，利用cnode社区提供的api实现，需去cnode个人中心登陆查看accesstoken才可以登录。

## 实现功能
- [x] 首页列表，下拉加载 -- 完成
- [x] 主题详情，回复，点赞 -- 完成
- [x] 登录,退出 --完成
- [x] 消息列表，消息提醒，消息标记为已读 -- 完成
- [x] 发布话题 -- 完成
- [x] 个人中心 -- 完成

## 预览
在线预览地址 👉 http://60.205.181.124:18000/

首页

![首页](/img/cnode-vue/page.png)

文章详情页

![文章详情页](/img/cnode-vue/pagelist.png)

侧边栏

![侧边栏](/img/cnode-vue/aside.png)

回复页面

![回复页面](/img/cnode-vue/replay.png)

发布话题页

![发布话题页](/img/cnode-vue/newartical.png)
## 技术栈
- **Vue2.0**：前端页面展示。
- **Vue-cli**：vue手脚架工具。
- **Vuex**：实现不同组件间的状态共享。
- **vue-router**：页面路由切换。
- **axios**：向后端发起请求。
- **Socket.io**：实现实时通信
- **Moment.js**：格式化时间。
- **ES6**：箭头函数等语法很好用。
- **localStorage**：保存用户信息。
- **Webpack**：vue-cli自带Webpack，添加sass相关loader，其他vue-cli已经配置好了webpack，你只需要安装依赖就可以，使用的时候只需要<style lang="scss"></style>。
- **SASS(SCSS)**：用SCSS做CSS预处理语言。
- **flex**：flex弹性布局，简单适配手机、PC端。
- **CSS3**：CSS3过渡动画及样式。

## 目录结构

项目使用vue-cli手脚架工具搭建，大部分源文件放在src目录下，所有这里只列出src目录结构，其他请参考[vue-cli手脚架](https://segmentfault.com/a/1190000007880723)工具
```
|-- src                              // 源码目录
|   |-- components                   // 公共组件
|       |-- about                    // 关于页
|       |-- asidemenu                // 侧边栏页
|       |-- content                  // 文章列表页和文章详情页 
|       |-- header                   // 首页头部
|       |-- info                     // 个人中心页
|       |-- login                    // 登陆页
|       |-- newarticle               // 新建话题页
|       |-- user                     // 用户详情页
|   |-- common                       // 公用资源
|       |-- style                    // 公用sass样式（默认样式）
|       |-- icons                    // 公用svg图标页
|       |-- js                       // 公用javascript
|   |-- router                       // 配置页面路由
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
```

## 总结

1. 深入学习vue.js全家桶，使用Vuex管理组件状态很方便。

2. 事先要先想好整个页面结构和组件划分，方便快速开发。


## About
关于我: http://www.qirenji.info/about

GitHub: https://github.com/qirenji/

E-mail: lyf@qirenji.com
