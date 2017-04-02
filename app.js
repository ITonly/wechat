'use strict';
var Koa =require('koa');
var sha1 = require('sha1');
var config = {
    wechat:{
        appID:'wx6bf5cbeccdf6bd61',
        appSecret:'9a987be388def291f1d6deec9ab49aea',
        token:'woshizishaofeilalalalaha'
    }

};


var app = new Koa();


app.use(function *(next) {
    console.log(this.query);
    var token=config.wechat.token;
    var signature=this.query.signature;
    var nonce =this.query.nonce;
    var timestamp=this.query.timestamp;
    var echostr = this.query.echostr;


    var str = [token,timestamp,nonce].sort().join('');
    var sha =sha1(str);
    if(sha === signature){
        this.body=echostr+'';
    }else {
        this.body='请求失败';
    }
});

app.listen(4200);
console.log('成功启动服务，端口是 8765');