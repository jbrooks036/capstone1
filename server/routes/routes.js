'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    projects       = require('../controllers/projects'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.get('/about', home.about);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.get('/projects', projects.index);
  app.post('/projects', projects.create);
  app.get('/projects/:id', projects.show);
  app.put('/projects/:id', projects.update);
  app.delete('/projects/:id', projects.deleteProject);
  app.get('/users', users.index);

  app.use(security.bounce);
  app.delete('/logout', users.logout);

  console.log('Express: Routes Loaded');
};

