'use strict';

var User  = require('../models/user');
//    _     = require('lodash');

exports.register = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.status(200).end();
    }else{
      res.status(400).end();
    }
  });
};

exports.login = function(req, res){
  User.login(req.body, function(err, user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.setHeader('X-Authenticated-User', user.email);
          res.status(200).end();
        });
      });
    }else{
      res.status(401).end();
    }
  });
};

exports.logout = function(req, res){
  // console.log('server-user-controller-logout >>>>>>>>>>>  req.session: ', req.session);
  req.session.destroy(function(){
    res.setHeader('X-Authenticated-User', 'anonymous');
    res.status(200).end();
  });
};

exports.index = function(req, res){
  // console.log('server-user-controller-index >>>>>>>> req.session: ', req.session);
  User.findAll(function(err, users){
    // console.log('server-user-controller-index >>>>>>>> users: ', users);
    res.send({users:users});
  });
};
