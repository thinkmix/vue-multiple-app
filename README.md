# vue-multiple-app

> 基于webpack搭建，可根据配置编译出不同的web版本。

## Features
+ 版本控制，通过交互式命令输入编译版本，也可以执行覆盖更新上一个版本的操作
+ 不同app模式，可设置不同的主题、请求地址和其他自定义参数
+ 多页模式，可根据不同目录分别生成页面

## 命令

``` bash
# 安装依赖
yarn install

# 开发模式
node bat --dev

# 生成环境构建
node bat --build
```
# 架构目录
```

├── src
│   ├── assets（公共资源）
│   │   ├── fonts
│   │   ├── img
│   │   └── css
│   ├── components（公共组件）
│   ├── config（配置）
│   ├── utils（公共工具）
│   ├── pages（视图）
│   |    ├──_common（公共页面）
│   │    └── ...
│   └── main.js
```
## 文件生成

```bash
文件是按照定义的source name生成的
例：name = 'app1'
    文件名：index.app1.html
```

## 获取自定义变量
> 可在页面中获取定义的source变量

```javascript
// webpack中的配置代码
....
new webpack.DefinePlugin({
    'process.env': config.build.env,
    'APP_SOURCE': JSON.stringify(appSource)
})
....
// web中获取
console.log(APP_SOURCE)
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-cli](https://github.com/vuejs/vue-cli).

