'use strict';

var Project = require('../models/project');

exports.index = function(req, res){
  console.log('server-controller-index >>>>>>>> req.user._id: ', req.user._id);
  Project.findAllByUserId(req.user._id, function(err, projects){
    console.log('server-controller-index >>>>>>>> projects: ', projects);
    res.send({projects:projects});
  });
};

exports.create = function(req, res){
  console.log('server-controller-create >>>>>>>> req.user._id: ', req.user._id);
  console.log('server-controller-create >>>>>>>> req.body: ', req.body);
    Project.create(req.body, req.user._id, function(err, project){
      res.send({project:project});
  });
};

