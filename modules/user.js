var mysql = require('mysql');
var db_config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejsdb'
}
var pool = mysql.createPool(db_config);

function User(user){
    this.username = user.username;
    this.userpass = user.userpass;
};
module.exports = User;


//監聽connect
pool.on('connection', function (connection) {
    connection.query(" set SEESION  auto_increment_increment=1  ");
});

/*
//直接使用
pool.query(" select 1+1 as result  ", function (err, rows, fields) {
    if (err) {
        console.log("err:",err.message);
    }
    console.log(" sa :", rows[0].result)
});
*/

/*
//共享


once(`select * from userinfo where Id=${5} or Id=${6} `, function (err, result) { if (err) { console.log(err.message); } console.log(result); });

//过滤

once("select * from userinfo where Id =" + pool.escape('Id = 5 or Id= 6'), function (err, result) { if (err) { console.log(err.message); } console.log(result); });
once("select * from userinfo where Id = " + pool.escape('5'), function (err, result) { if (err) { console.log(err.message); } console.log(result); });


*/
/**
 * 短綫重連

 var connection;
 function handleDisconnect() {
    connection =mysql.createConnection(db_config);
    connection.connect(function (err) {
        if (err) {
            console.log("正在断线重连.....", new Date());
            setTimeout(handleDisconnect, 2000);
            return;
        }
        console.log("连接成功");
    });
    connection.on("error", function (err) {
        console.log("db error", error);
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}


 handleDisconnect();
 */


User.prototype.save = function save(callback){
    var user = {
        userName : this.username,
        userPass : this.userpass
    }
    var install_sql = "insert into userInfo(Id,UserName,UserPass) values (0,?,?)";
    var params = [user.userName,user.userPass];
    once(install_sql,params,function (err,result) {
        if (err) {
            console.log("insertUser_Sql Error: " + err.message);
            return;
        }
        console.log("invoked[save]");
        callback(err,result);
    });
}

User.getUserNumByName  = function getUserNumByName(userName,callback) {
    var getUserNum_sql = "select count(1) from userInfo where userName = ?";
    once(getUserNum_sql,userName,function (err,result) {
        if(err){
            console.log("getUserNumByName Error: " + err.message);
            return;
        }
        console.log("invoked[getUserNumByName]")
        callback(err,result);
    });
}

User.getUserModelByName  = function getUserModelByName(userName,callback) {
    var getUserNum_sql = "select * from userInfo where userName = ?";
    once(getUserNum_sql,userName,function (err,result) {
        if(err){
            console.log("getUserByUserName Error: " + err.message);
            return;
        }
        console.log("invoked[getUserNumByName]")
        callback(err,result);
    });
}



function once(sql,pa, cb) {
    pool.getConnection(function (err, con) {
        if (!con || err) {
            cb(err, null)
        } else if(pa===null){
            con.query(sql, function (err, result) {
                con.release();
                cb(err, result);
            })
        }else{
            con.query(sql,pa, function (err, result) {
                con.release();
                cb(err, result);
            })
        }
    });
}




