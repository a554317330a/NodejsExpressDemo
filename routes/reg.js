var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    res.render('logout',{ title:'注册页面:'});
})
module.exports = router;
