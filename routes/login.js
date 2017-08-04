var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    res.render('login',{ title:'登陸頁面:'});
})
module.exports = router;
