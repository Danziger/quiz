var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var partials  = require('express-partials');
var swig = require("swig"); // Use Swig instead of EJS
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.set('view engine', 'html'); // Set .html as the default extension...
app.set('views', __dirname + '/views'); // ...tell Express where are these html files...
app.engine('.html', swig.renderFile); // ...assign the swig engine to .html files

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

//app.use(partials());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // extended = true by default
app.use(cookieParser("this-is-the-seed-for-the-cookies"));
app.use(session({
	secret: "this-is-the-seed-for-the-cookies",
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));

// Dinamyc helpers:
app.use(function(req, res, next) {

	console.log(req.path);
	
	// Save current path in session.redir to redirect user to it after login/logout:
	if( !req.path.match(/\/login|\/logout/)) {
		req.session.redir = req.path;
	}
	
	// Expose req.session in the views:
	// http://expressjs.com/api.html#res.locals:
	// An object that contains response local variables scoped to the request,
	// and therefore available only to the view(s) rendered during that request
	// or response cycle (if any). Otherwise, this property is identical to app.locals.
	res.locals.session = req.session;
	
	next(); // Go on...
});

// ROUTER: 
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
	  title: "Quiz",
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: "Quiz",
    message: err.message,
    error: {}
  });
});


module.exports = app;