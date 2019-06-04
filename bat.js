#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer')
const shell = require('shelljs')
const argv = require('optimist').argv;

const questions = [
	{
		type: 'list',
		message: '请选择系统:',
		name: 'name',
		choices: [
			"app1",
			"app2",
		],
		filter: function (val) {
			if(val == 'app1'){
				return 'app1';
			}else if(val == 'app2'){
				return 'app2';
			}
		}
	},
]

const buildQuestions = [
	{
		type : "input",
		name : "currentVersion",
		message : "请输入当前版本号：",
		validate: function(val) {
			if(!val.match(/\d{8}/g)) {
				return "版本号格式输入错误,例：YYYYMMDD00";
			}
			return true;
		}
	},
	{
		type: "confirm",
		message: "是否更新上一个版本？",
		name: "isCover",
		prefix: "",
		suffix: "",
	},{
		type: "input",
		message: "请输入上一个版本号：",
		name: "lastVersion",
		validate: function(val) {
			if(!val.match(/\d{8}/g)) {
				return "版本号格式输入错误,例：YYYYMMDD00";
			}
			return true;
		},
		when: function(answers) {
			return answers.isCover
		}
	},
]

let cm = '';
if(argv.build){//编译模式
	questions.push(...buildQuestions);
	cm = 'build';
}else{//开发模式
	cm = 'dev';
}

inquirer.prompt(questions).then(function (answers) {
	if (shell.exec(`yarn ${ cm } --INFO="${ JSON.stringify(answers) }"`).code !== 0) {//执行
		shell.echo('Error: yarn build failed');
		shell.exit(1);
	}
})