'use strict';

exports.index = function(req, res){
  res.send({msg:['Welcome, research collaborator!','Lets get a move on!']});
};

exports.about = function(req, res){
  res.status(200).end();
};

