const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const ConfBase = require('./webpack.base.conf');
const utils = require('./utils');
const config = require('../config')

const webpackConfigDev = {
    mode: 'development', // 通过 mode 声明开发环境
    
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        filename: './js/[name].bundle.js',
        publicPath: '/'
    },

    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: "#source-map", // 开启调试模式

    devServer: {
        contentBase: path.join(__dirname, "../src"),
        publicPath: '/',
        host: utils.getLocalIP(),
        port: config.dev.port,
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true, // 开启热更新
        //服务器代理配置项
        proxy: config.dev.proxy
    },
}
module.exports = merge(ConfBase.webpackConfbase, webpackConfigDev);