
//g.js generator的缩写
'use strict';
var sha1 = require('sha1');
var getRawBody = require('raw-body')
var Wechat = require('./wechat')
var util = require('./util')

module.exports = function(opts,handler){
       var wechat = new Wechat(opts)

        return function *(next) {
        var that = this
        console.log(this.query)
        var token=opts.token;
        var signature=this.query.signature;
        var nonce =this.query.nonce;
        var timestamp=this.query.timestamp;
        var echostr = this.query.echostr;


        var str = [token,timestamp,nonce].sort().join('');
        var sha =sha1(str);
        console.log(sha);
        if(this.method === 'GET'){
            if(sha === signature){
                this.body=echostr+'';
            }else {
                this.body='请求失败';
            }

        }
        else if(this.method === 'POST'){
            if(sha !== signature){
                this.body='wrong';
                return false;
            }
            // 通过raw-body模块，可以把这个this上的request对象，其实也就是http模块中的request对象，去拼装它的数据，最终
            // 可以拿到一个buffer数据
             var data = yield getRawBody(this.req,{
                 length:this.length,
                 limit: '1mb',
                 encoding:this.charset
             })
            var content = yield util.parseXMLAsync(data) 

            console.log(content)
            var message = util.formatMessage(content.xml)

            console.log('messageg', message) 
            // 把message挂载到this.weixin上
            this.weixin = message
            // 这里少了什么呢 handler 是干什么的 外面传入了一个控制器handler
            yield handler.call(this,next)

            wechat.reply.call(this)
        }
        
    }

}