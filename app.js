const express = require('express'),
    bodyParser = require('body-parser'),    
    cors = require('cors'),    
    errorhandler = require('errorhandler'),
    db = require('./models');

const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('method-override')());
app.use(require('./routes'));

db.sequelize.sync();

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(errorhandler());
}







/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){  
  console.log('Listening on port ' + server.address().port);
});