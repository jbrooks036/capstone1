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

exports.show = function(req, res){
  console.log('server-controller-show >>>>>>>> req.project._id: ', req.project._id);
  Project.findByProjectId(req.params._id, function(err, project){
    console.log('server-controller-show >>>>>>>> project: ', project);
    res.send({project:project});
  });
};

/*
exports.deleteProject = function(req, res){
  var _id = Mongo.ObjectID(req.params.id);
  Project.collection.remove({_id:_id}, true, function(err, result){
    res.send({result:result});
  });
};
*/

