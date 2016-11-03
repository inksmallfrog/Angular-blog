var express = require('express')
	, path = require('path')
	, favicon = require('serve-favicon')
	, logger = require('morgan')
	, cookieParser = require('cookie-parser')
	, bodyParser = require('body-parser')
	, mongoose = require('mongoose')

	, posts = require('./routes/posts')
	, catagories = require('./routes/catagories')

	, app = express();

// mongoose
mongoose.connect('mongodb://localhost/blog', function(err){
	if(err){
		console.log('connection error', err);
	}
	else{
		console.log('connection successful');
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/posts', posts);
app.use('/catagories', catagories);

app.get('/', function (req, res) {
	res.sendfile('public/index.html');
});
app.get('/admin', function(req, res) {
	res.sendfile('public/admin.html');
});
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
