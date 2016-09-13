'use strict';

var port    = process.env.PORT || 8080,
    db      = process.env.DB || 'capstone',
    express = require('express'),
    app     = express();

app.set('port', port);

require('./lib/config')(app);
require('./routes/routes')(app, express);

require('./lib/mongodb')(db, function(){
  app.listen(port);
});

module.exports = app;

