// Description:
//   Messing around with the qiita API.
// Commands:
//   hubot qiji-post 'contents'  - Return post title and so on.

var moment = require('moment');
var m = moment();
var Qiita = require('qiita-js');
var TOKEN = process.env.QIITA_TOKEN;
var BOT = {};
Qiita.setToken(TOKEN);
//Qiita.Resources.User.get_authenticated_user().then(function(user){
//  BOT = user;
//});

var options = {
  "body": "",
  "coediting": false,
  "gist": false,
  "private": true,
  "tags": [
    {
      "name": "議事録"
    }
  ],
  "title": "",
  "tweet": false
};

//コマンド実行
module.exports = function(robot) {
  robot.respond(/qiji-post (.+)$/i, function(msg){
    //引数チェック
    if(!msg.match[1]) msg.send('?! 引数がたりないぞ。');
    options.title = '議事録' + m.format("YYYY年MM月DD日 HH:mm:ss");
    options.body = msg.match[1];
    Qiita.Resources.Item.create_item(options).then(function(res){
      var output = res.title + 'を投稿しました。' + res.url;
      msg.send(output);
    });
  });
};