'use strict';

var Project = require('../models/project');

exports.create = function(req, res){
  console.log('server-controller-create >>>>>>>> req.user._id: ', req.user._id);
  console.log('server-controller-create >>>>>>>> req.body: ', req.body);
  Project.create(req.body, function(err, project){
    res.send({project:project});
  });
};

