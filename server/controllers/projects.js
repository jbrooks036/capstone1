'use strict';

var Project = require('../models/project'),
    Mongo   = require('mongodb'),
    _       = require('lodash'),
    // User    = require('../models/user'),
    mp      = require('multiparty');


exports.index = function(req, res){
  // console.log('server-controller-index >>>>>>>> req.user: ', req.user);
  // console.log('server-controller-index >>>>>>>> req.user._id: ', req.user._id);
  Project.findAllByUserId(req.user._id, function(err, projects){
    // console.log('server-controller-index >>>>>>>> projects: ', projects);
    res.send({projects:projects});
  });
};

exports.create = function(req, res){
//  console.log('server-controller-create >>>>>>>> req.user._id: ', req.user._id);
//  console.log('server-controller-create >>>>>>>> req.body: ', req.body);
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    console.log('server-controller-create >>>>>>>> fields: ', fields);
    console.log('server-controller-create >>>>>>>> files: ', files);
    var projectInfo = JSON.parse(fields.project[0]);
    console.log('server-controller-create >>>>>>>> projectInfo: ', projectInfo);
    Project.create(req.user._id, projectInfo, files, function(err, success, project){
      res.send({project:project});
    });
  });
};

exports.show = function(req, res){
  console.log('server-controller-show >>>>>>>> req.project._id: ', req.project._id);
  Project.findByProjectId(req.params._id, req.user._id, function(err, project){
    console.log('server-controller-show >>>>>>>> project: ', project);
    res.send({project:project});
  });
};

exports.update = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, file){
    // put fields into a format that is easier to work with
    var projectInfo = JSON.parse(fields.project[0]);
    console.log('server-projects-controller-update >>>>>>>> projectInfo: ', projectInfo);
    console.log('server-projects-controller-update >>>>>>>> file: ', file);

    Project.findByProjectId(projectInfo._id, req.user._id, function(err, project){
      // console.log('server-projects-controller-update >>>>>>>> project: ', project);
      // console.log('server-projects-controller-update >>>>>>>> typeof project: ', typeof project);
      // not sure why this is necessary here, but passed in project is not correctly prototyped
      project = _.create(Project.prototype, project);

      project.save(projectInfo, file, function(){
      console.log('server-projects-controller-update(save) >>>>>>>> project: ', project);
        res.send({project:project});
      });
    });
  });
};

exports.deleteProject = function(req, res){
  var _id = Mongo.ObjectID(req.params.id);
  Project.collection.remove({_id:_id}, true, function(err, result){
    res.send({result:result});
  });
};

