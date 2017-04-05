'use strict';
var Koa =require('koa');
var path = require('path')
var util = require('./libs/util')
var config = require('./config')
var wechat = require('./wechat/g');
var weixin = require('./weixin')
var wechat_file = path.join(__dirname,'./config/wechat.txt')




var app = new Koa();


app.use(wechat(config.wechat, weixin.reply));

app.listen(4200);
console.log('成功启动服务，端口是 4200');