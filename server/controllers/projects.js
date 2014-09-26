'use strict';

var Project = require('../models/project');

exports.index = function(req, res){
  console.log('server-controller-index >>>>>>>> req.user._id: ', req.user._id);
  Project.findAllByUserId(req.user._id, function(err, projects){
    console.log('server-controller-index >>>>>>>> projects: ', projects);
    res.send({projects:projects});
  });
};


