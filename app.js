var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');



/*
var index = require('./routes/index');//首页
var reg = require('./routes/reg');//注册页面
var login = require('./routes/login');//登录页面
var logout = require('./routes/logout');//退出登录页
var subform  = require('./routes/subform');//提交表单测试
var usesession = require('./routes/usesession');//session测试
var usecookies = require('./routes/usecookies');//cookies测试
var usecrypto = require('./routes/usecrypto');//加密测试
*/


var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Wilson'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
/*
app.use('/', index);//首页
app.use('/reg', reg);//注册
app.use('/login', login);//登录
app.use('/logout', logout);//登出
app.use('/subform',subform);//提交表单测试
app.use('/usesession', usesession);//session测试
app.use('/usecookies', usecookies);//cookies测试
app.use('/usecrypto', usecrypto);  //加密测试
*/
//使用靠就这个中间件
app.use(session({ secret: 'wilson'}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
