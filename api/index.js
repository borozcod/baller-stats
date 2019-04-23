var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var routes = require('./routes.js');
var cors = require('cors');
var path = require('path');
var port = 8082;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

app.listen(port);
console.log('App listening on port ' + port);
