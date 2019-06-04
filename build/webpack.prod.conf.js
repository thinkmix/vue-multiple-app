const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const config = require('../config')
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const Confbase = require('./webpack.base.conf');
const CompressionWebpackPlugin = require('compression-webpack-plugin')//GZIP
require('shelljs/global')
const ora = require('ora')

const appSource = Confbase.appSource;

const webpackConfProd = {
    mode: 'production', // 通过 mode 声明生产环境
    
	output: {
		path: path.resolve(__dirname, `../dist/${ appSource.currentVersion }/`),
		// 打包多出口文件
		filename: 'assets/js/[name].[hash].js',
		publicPath: `${ config.build.assetsPublicPath }${ appSource.currentVersion }/`
    },
    
    devtool: false,
    
	plugins: [
		//删除dist目录
		new cleanWebpackPlugin(['../dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			verbose: true, //开启在控制台输出信息
			dry: false,
		}),
		//压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_debugger: false,
					dead_code: true,
					drop_console: true
				}
			}
		}),
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]

}

const webpackConfig = merge(Confbase.webpackConfbase, webpackConfProd);

var spinner = new ora();
spinner.color = 'green';
spinner.text = `开始编译${ appSource.name }版本：${ appSource.currentVersion }`;
spinner.start();

webpack(webpackConfig, function(){
	if(appSource.isCover == 'true'){//是否覆盖上一个版本
		cp('-R', `dist/${ appSource.currentVersion }/`, `dist/${ appSource.lastVersion }/`);
		console.log('\033[40;34m 上一个版本覆盖更新完成\033[0m');
	}else {
		spinner.stop();
	}
	
})

module.exports = webpackConfig