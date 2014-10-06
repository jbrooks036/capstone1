'use strict';

var // bcrypt = require('bcrypt'),
    _      = require('lodash'),
    Mongo  = require('mongodb');

function Project(o, userId){
  this.name   = o.name;
  this.due    = new Date(o.due);
//  this.tags   = o.tags.split(',');
  this.userId = userId;
}

Object.defineProperty(Project, 'collection', {
  get: function(){return global.mongodb.collection('projects');}
});

Project.create = function(o,userId, cb){
  var p = new Project(o, userId);
  Project.collection.save(p, cb);
};

Project.findAllByUserId = function(userId, cb){
  console.log(' model - findAllByUserId >>>>>>>>>>> userId: ', userId);
    Project.collection.find({userId:userId}).toArray(cb);
};

Project.findByProjectIdAndUserId = function(projectId, userId, cb){
  var _id = Mongo.ObjectID(projectId);
  Project.collection.findOne({_id:_id, userId:userId}, function(err, obj){
    if(obj){
      cb(err, _.create(Project.prototype, obj));
    }else{
      cb();
    }
  });
};

Project.findByProjectId = function(id, cb){
  console.log(' model - findByProjectId >>>>>>>>>>> id: ', id);
  var _id = Mongo.ObjectID(id);
  Project.collection.findOne({_id:_id}, cb);
};

module.exports = Project;

