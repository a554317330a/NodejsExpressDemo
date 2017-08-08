var express = require('express');
var router = express.Router();
var TITLE_LOGIN = "退出登陸";
router.get('/',function(req,res){
    res.render('login',{title:TITLE_LOGIN});
})

module.exports = router;