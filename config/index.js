module.exports = {
  source:{
    app1: {
      name:'app1',//app的变量标识
      logo:'',
      color:'#4b3887',//主题颜色
      appType: '1',
      BASE_URL: ''//api请求地址
    },
    app2: {
      name:'app2',//app的变量标识
      logo:'',
      color:'#4b3887',//主题颜色
      appType: '2',
      BASE_URL: ''//api请求地址
    },
  },
  build: {
    env: {
      NODE_ENV: '"production"',
    },
    assetsPublicPath: '/xxx/',//资源访问路径，不同版本会跟上版本号
  },
  dev: {
    env: {
      NODE_ENV: '"development"',
      BASE_URL: '""'//api请求地址
    },
    port: 8091,
    proxy: {
      '/api/':{
        target:'http://127.0.0.1:3000/',
        changeOrigin:true,
        secure: false,
        pathRewrite:{
            '^/api':'/api/'
        }
      },
    },
  }
}
