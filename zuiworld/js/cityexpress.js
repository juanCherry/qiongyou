
var express = require('express');
var fs = require('fs');

var app = express();


app.get('/index.html',function(req,res){
	var realPath = fs.realpathSync('../../zuiworld/html/index.html');
	res.sendFile(realPath);
})


app.get('/getCityWalk',function(req,res){
  var rs = fs.createReadStream('../../zuiworld/zuijson/cityWalkList.json');
  rs.pipe(res);
})

app.get('*',function(req,res){
	console.log(req.path);
	var bol = fs.existsSync('../../zuiworld' + req.path);
	if(bol){
		var realPath = fs.realpathSync('../../zuiworld' + req.path);
		//sendFile发送的路径必须是绝对路径，所以需要将相对路径转换为绝对路径
		res.sendFile(realPath);
	}
})

app.listen(8888,function(){
  console.log('服务器启动成功');
})
