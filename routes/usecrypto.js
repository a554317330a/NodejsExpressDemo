var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const secret = 'abcdefg'; // 加密key
router.get('/',function(req,res){
res.render('usecrypto',{ title:'字符串加密使用实示例:'});
})

router.post('/',function (req,res) {
    var
        userName = req.body.txtUserName;
        passWord = req.body.txtPassWord;




    var hash = crypto.createHmac('sha256', secret)
        .update(passWord)
        .digest('hex');
    console.log("加密后的密码："+hash);

    res.render('usecrypto',{ title:'字符串加密使用实示例:'});

})

module.exports = router;