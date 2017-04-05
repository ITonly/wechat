var path = require('path')
var util = require('./libs/util')
var wechat_file = path.join(__dirname,'./config/wechat.txt')

var config = {
    wechat:{
        appID:'wx4da6b338313aeaad',
        appSecret:'526075f213c4590f0ff9fcdf3bf08c31',
        token:'lsd',
        getAccessToken: function(){
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file,data)
        }
    }

};

module.exports = config