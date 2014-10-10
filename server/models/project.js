'use strict';

var // bcrypt = require('bcrypt'),
    _      = require('lodash'),
    fs     = require('fs'),
    path   = require('path'),
    User   = require('./user'),
    Mongo  = require('mongodb');

function Project(userId, projectInfo, files){
  this._id           = new Mongo.ObjectID();
  this.name          = projectInfo.name;
  this.due           = new Date(projectInfo.due);
  this.doc           = stashDoc(this._id, files);
  this.researchers   = [];
  this.researchers.push(Mongo.ObjectID(userId));
  this.researchers.push(Mongo.ObjectID(projectInfo.collaborator));
//  this.tags   = o.tags.split(',');
//  console.log('server-Project-constructor >>>>>>>>>>>>>> new project: ', this);
}

Object.defineProperty(Project, 'collection', {
  get: function(){return global.mongodb.collection('projects');}
});

Project.create = function(userId, fields, files, cb){
  var p = new Project(userId, fields, files);
  console.log('model-create >>>>>>>>>>> typeof p: ', typeof p);
  Project.collection.save(p, cb);
};

Project.findAllByUserId = function(userId, cb){
//  console.log(' model - findAllByUserId >>>>>>>>>>> userId: ', userId);
  Project.collection.find({researchers: userId}).toArray(function(err, projects){
    for(var i = 0; i < projects.length; i++) {
      projects[i] = rePrototype(projects[i]);
      console.log('model-findAllByUserId >>>>>>>>>>> typeof projects[i]: ', typeof projects[i]);
    }
    cb(err, projects);
  });
};

// Dave Boling says this function is never called!!
Project.findByProjectId = function(projId, userId, cb){
  console.log('model-findByProjectId >>>>>>>>>>> userId: ', userId);
  console.log('model-findByProjectId >>>>>>>>>>> projId: ', projId);
  // this will be changed to include async.map for > 1 collaborators
  var _id = Mongo.ObjectID(projId);
  Project.collection.findOne({_id:_id}, function(err, obj){
    console.log('model-findByProjectId >>>>>>>>>>> obj: ', obj);
    //var collaborators = _.without(project.researchers, userId);
    //console.log(' model - findByProjectId >>>>>>>>>>> collaborators: ', collaborators);
    var proj = rePrototype(obj);
    console.log('model-findByProjectId >>>>>>>>>>> proj: ', proj);
    console.log('model-findByProjectId >>>>>>>>>>> typeof proj: ', typeof proj);
    cb(proj);
  });
};

Project.prototype.save = function(fields, file, cb){
  console.log('model-project-save >>>>>>>>>> fields: ', fields);
  console.log('model-project-save >>>>>>>>>> file: ', file);
  var properties  = Object.keys(fields),
    self          = this;

  properties.forEach(function(property){
    console.log('s-project-controller-save >>>>>>>>> property: ', property);
    switch(property){
      case 'collaborator':
        self.researchers.push(fields.collaborator);
        break;
      case 'doc':
        var newDoc = stashDoc(file, self._id);
        self.doc = newDoc ? newDoc : self.doc;
        break;
      default:
        self[property] = fields[property];
    }
  });

  this._id = Mongo.ObjectID(this._id);

  Project.collection.save(this, cb);
};

module.exports = Project;

// PRIVATE HELPER FUNCTIONS

function stashDoc(projectId, files){

  // stashes uploaded file into assets/docs directory w/ project ID as name,
  // returns an empty file if no file is in the files object
  if(files.file){
    var tempPath  = files.file[0].path,
        relDir    = '/assets/docs/',
        absDir    = __dirname + '/../../public' + relDir,
        ext       = path.extname(tempPath),
        name      = projectId + ext,
        absPath   = absDir + name,
        relPath   = relDir + name;

    fs.renameSync(tempPath, absPath);
    return relPath;
  }else{
    return ('/assets/docs/emptyFile.docx');
  }
}

function rePrototype(proj){
  console.log('model-rePrototype >>>>>>>>>>> typeof proj: ', typeof proj);
  proj = _.create(Project.prototype, proj);
  console.log('model-rePrototype >>>>>>>>>>> typeof proj: ', typeof proj);
  return proj;
}


