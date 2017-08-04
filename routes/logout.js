var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
    res.render('logout',{ title:'退出登錄頁面:'});
})
module.exports = router;
