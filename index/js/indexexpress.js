var express = require('express');
var fs = require('fs');
// var qs = require('querystring');
var app = express();

app.get('/index.html',function(req,res){
	var realPath = fs.realpathSync('../../index/html/index.html');
	//读取到轮播图的路径
	// fs.readFile('../../index/indexjson/banner.json',function(err,data){
	// 	if(err){
  //     console.log(err);
  //   }else {
	//
	// 		var data = JSON.parse(data);
  //   }
	// })
	res.sendFile(realPath);
})

app.get('/getBanner',function(req,res){
	var rs = fs.createReadStream('../../index/indexjson/banner.json');
	rs.pipe(res);
})

app.get('/getMenu',function(req,res){
	var rs = fs.createReadStream('../../index/indexjson/menu.json');
	rs.pipe(res);
})

app.get('/getFreeWalk',function(req,res){
	var rs = fs.createReadStream('../../index/indexjson/freeWalk.json');
	rs.pipe(res);
})

app.get('/gotocity',function(req,res){
	var realPath = fs.realpathSync('../../zuiworld/html/index.html');
		res.sendFile(realPath);
})

app.get('/getCityWalk',function(req,res){
  var rs = fs.createReadStream('../../zuiworld/zuijson/cityWalkList.json');
  rs.pipe(res);
})

app.get('*',function(req,res){
	// var Path = req.path;
	console.log(req.path);
	var bol = fs.existsSync('../../index' + req.path);
	var bols = fs.existsSync('../../zuiworld'+req.path);
	console.log(bol);
	if(bol){
		var realPath = fs.realpathSync('../../index' + req.path);
		//sendFile发送的路径必须是绝对路径，所以需要将相对路径转换为绝对路径
		res.sendFile(realPath);
	}else if(bols){
		var realPath = fs.realpathSync('../../zuiworld' + req.path);
		//sendFile发送的路径必须是绝对路径，所以需要将相对路径转换为绝对路径
		res.sendFile(realPath);
	}
})

app.listen(8888,function(){
	console.log('启动成功！');
})
