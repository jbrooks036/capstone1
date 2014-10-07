'use strict';

var // bcrypt = require('bcrypt'),
    _      = require('lodash'),
    fs     = require('fs'),
    path   = require('path'),
    Mongo  = require('mongodb');

function Project(userId, projectInfo, files){
  this._id    = new Mongo.ObjectID();
  this.userId = userId;
  this.name   = projectInfo.name;
  this.due    = new Date(projectInfo.due);
  this.doc    = stashDoc(this._id, files);
//  this.tags   = o.tags.split(',');
}

Object.defineProperty(Project, 'collection', {
  get: function(){return global.mongodb.collection('projects');}
});

Project.create = function(userId, fields, files, cb){
  var p = new Project(userId, fields, files);
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

/*  To be fixed for Projects *****
Contact.findContacts = function(userId, cb){
  Contact.collection.find({ownerId:userId}).toArray(cb);
};

Contact.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Contact.collection.findOne({_id:_id}, function(err, obj){
    var contact = Object.create(Contact.prototype);
    contact = _.extend(contact, obj);
    cb(err, contact);
  });
};

Contact.prototype.save = function(fields, file, cb){
  var properties  = Object.keys(fields),
    self          = this;

  properties.forEach(function(property){
    switch(property){
      case 'photo':
        var newPhoto = stashPhoto(file, self._id);
        self.photo = newPhoto ? newPhoto : self.photo;
        break;
      default:
        self[property] = fields[property];
    }
  });

  this._id      = Mongo.ObjectID(this._id);
  this.ownerId  = Mongo.ObjectID(this.ownerId);
  this.bday     = (this.bday) ? (new Date(this.bday)) : null;

  Contact.collection.save(this, cb);
};

*/
module.exports = Project;

// HELPER FUNCTION

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


