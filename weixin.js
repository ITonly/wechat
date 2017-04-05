'use strict'

var config = require('./config')
var Wechat = require('./wechat/wechat')
var wechatApi = new Wechat(config.wechat)

exports.reply = function* (next){
    var message = this.weixin

    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){
            if(message.EventKey){
                console.log('扫二维码进来：' + message.EventKey + ' '+ message.ticket)
            }
            this.body = '哈哈，你订阅了这个号\r\n' + ' 消息ID: ' + message.MsgId
        }
        else if(message.Event === 'unsubscribe'){
            console.log('无情取关')
            this.body = ''
        }
        else if (message.Event === 'LOCATION'){
            this.body = '您上报的位置是： ' + message.Latitude + '/'+ message.Longitude + '-' + message.Precision
        }
        else if( message.Event === 'CLICK'){
            this.body = '您点击了菜单： '+ message.EventKey
        }
        else if( message.Event === 'SCAN'){
            console.log('关注后扫描二维码'+ message.EventKey + ' ' + message.Ticket)
            this.body='看到你扫了一下哦'
         }
         else if (message.Event === 'VIEW'){
             this.body = '您点击了菜单中的链接： ' + message.EventKey
         }
    }
    else if(message.MsgType === 'text'){
        var content = message.Content
        var reply = '额，你说的 ' + message.Content + '太复杂了'
        if( content === '1'){
            reply ='天下第一吃大米'
        }
        else if( content === '2'){
            reply ='天下第二吃豆腐'
        }
        else if( content === '3'){
            reply ='天下第三吃仙丹'
        }
        else if( content === '4'){
            reply =[{
                title: '技术改变世界',
                description: '描述',
                picUrl: 'http://wx1.sinaimg.cn/mw690/a716fd45ly1feawedn2m2j20k00qoabh.jpg',
                url: 'https://github.com'
            }]
        }
        else if (content === '5'){
            var data = yield wechatApi.uploadMaterial('image',__dirname + '/1.jpeg')

            reply ={
                type: 'image',
                mediaId: data.media_id
            }

            this.body = reply
        }

        this.body = reply
    }

}