'use strict';

var // bcrypt = require('bcrypt'),
    _      = require('lodash'),
    fs     = require('fs'),
    path   = require('path'),
    async  = require('async'),
    User   = require('./user'),
    Mongo  = require('mongodb');

function Project(userId, projectInfo, files){
  this._id           = new Mongo.ObjectID();
  this.name          = projectInfo.name;
  this.due           = new Date(projectInfo.due);
  this.notes         = projectInfo.notes;
  this.currUserId    = userId;
  this.doc           = stashDoc(this._id, files);
  this.researchers   = [];
  this.researchers.push(Mongo.ObjectID(userId));
  this.researchers.push(Mongo.ObjectID(projectInfo.collaborator));
  if (files.file) {
    this.origFilename = files.file[0].originalFilename;
  }
//  this.tags   = o.tags.split(',');
//  console.log('server-Project-constructor >>>>>>>>>>>>>> new project: ', this);
}

Object.defineProperty(Project, 'collection', {
  get: function(){return global.mongodb.collection('projects');}
});

Project.create = function(userId, projInfo, files, cb){
  console.log('model-create >>>>>>>>>>> projInfo: ', projInfo);
  var p = new Project(userId, projInfo, files);
  console.log('model-create >>>>>>>>>>> p: ', p);
  Project.collection.save(p, cb);
};

Project.findAllByUserId = function(userId, projectsArrCB){
  Project.collection.find({researchers: userId}).toArray(function(err, projects){
    console.log('model-findAllByUserId >>>>>>>>>>> START projects: ', projects);
    if (projects.length > 0){
      var i = 0; // for now, just replace researchers array in first project
      console.log('model-findAllByUserId >>>>>>>>>>> i: ', i);
      console.log('model-findAllByUserId >>>>>>>>>>> projects[i]: ', projects[i]);
      projects[i].currUserId = userId;
      var rIdArr    = projects[i].researchers;
          // rObjArr = []; // for holding results of async.map applied to rIdArr
      async.map(rIdArr, iteratorFn, function(err, rObjArr){
        console.log('model-findAllByUserId >>>>>>>>>>> rObjArr: ', rObjArr);
        projects[i].researchers = rObjArr;
        console.log('model-findAllByUserId >>>>>>>>>>> projects[i]: ', projects[i]);
      }); // end 'if'

    }
    console.log('model-findAllByUserId >>>>>>>>>>> DONE projects: ', projects);
    projectsArrCB(null, projects);
  });
};

function iteratorFn(rId, cb){
  User.findById(rId, function(err, rObj){
    delete rObj.password;
    cb(null, rObj);
  });
}

/*
projectsArrCB = function(cb, projectsArr){
  console.log('model-project-projectsArrCB >>>>>>>>>> projectsArr: ', projectsArr);
  finalCB(null, projectsArr);
  this.researchers = researchers;
};
*/

/* "original" async.map stuff
Project.findAllByUserId = function(userId, cb){
  Project.collection.find({researchers: userId}).toArray(function(err, projects){
    console.log('model-findAllByUserId >>>>>>>>>>> projects: ', projects);
    for(var i = 0; i < projects.length; i++) {
      console.log('model-findAllByUserId >>>>>>>>>>> i: ', i);
      projects[i].currUserId = userId;
      projects[i].convertUserIdsToObjects(;
      console.log('model-findAllByUserId >>>>>>>>>>> projects[i]: ', projects[i]);
    }
    cb(err, projects);
  });
};

Project.prototype.convertResearcherIdsToObjects = function(cb){
  async.map(this.researchers, iteratorFn(rObj, cb), function(err, researchers){
    console.log('model-project-convertUserIds2Objs >>>>>>>>>> researchers: ', researchers);
    this.researchers = researchers;
  });
};

function iteratorFn(rId, cb){
  User.findById(rId, cb);
}
*/

// Dave Boling says this function is never called!!
// BUT it is called for update(!)
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
    cb(null, proj);
  });
};

Project.prototype.save = function(fields, file, cb){
  console.log('model-project-save >>>>>>>>>> fields: ', fields);
  console.log('model-project-save >>>>>>>>>> file: ', file);
  var properties  = Object.keys(fields),
    self          = this;

  properties.forEach(function(property){
    console.log('model-project-save >>>>>>>>> property: ', property);
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
  return _.create(Project.prototype, proj);
}


