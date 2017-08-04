    var express = require('express');
    var router = express.Router();

    router.post('/',function(req,res) {
    var
    userName1 = req.body.txtUserName,
    passWord1 = req.body.txtPassWord,
    userName2 = req.param('txtUserName')
    passWord2 = req.param('txtPassWord');

    console.log('req.query.txtUserName : ' + userName1);
    console.log("req.body.txtPassWord :" + passWord1);
    console.log("req.param('txtUserName') :" + userName2);
    console.log("req.param('txtPassWord') : " + passWord2);
    /*
    req.query：我用来接收GET方式提交参数

    　　req.body：我用来接收POST提交的参数

    　　req.params：两种都能接收到
    */
    res.render('subform', {title: '提交表單接收參數示例:'});

    })

    module.exports = router;