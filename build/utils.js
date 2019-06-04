exports.getLocalIP = () => {
  var os=require('os'),
    iptable={},
    ifaces=os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details,alias){
        if (details.family=='IPv4') {
          iptable[dev+(alias?':'+alias:'')]=details.address;
        }
      });
    }
    let valueArr=Object.values(iptable);
    return valueArr.filter((val)=>{
     return  val.indexOf('192.168.10')>-1;
    })[0];
}
exports.getCommandInfo = (sourceConf) =>{
//sourceConf为../config/index.js中的source配置
  var argv = require('optimist').argv;
  var info = {}, argvInfo = JSON.stringify(argv.INFO);
  if(argvInfo.indexOf('{') > -1)argvInfo = argvInfo.replace(/{|}|"/g, '')
  else argvInfo = argvInfo.replace(/\[|\]|"/g, '')//linux下json数据格式为[...]

  argvInfo.split(',').forEach((item) => {//格式为name:km,currentVersion:1234567891,lastVersion:1234567890,isCover:true,
    let s = item.split(":");
    info[s[0]] = s[1]
  });

  var appSource = sourceConf[info.name];
  if(!appSource) {
    console.log('\033[40;31m Your command of "source" is configure ?\nPlease check your config in "config/index.js"\033[0m');
    throw Error;
  }
  let nameZhn = '';
  switch (info.name){
    case 'app1':
      nameZhn = 'app1的中文名称';
      break;
    case 'app2':
      nameZhn = 'app1的中文名称';
      break;
  }
  info.nameZhn = nameZhn;
  Object.assign(appSource, info);

  console.log('\033[40;34m The current system is \033[40;33m'+ info.name +'\033[0m');
  return appSource;
}
