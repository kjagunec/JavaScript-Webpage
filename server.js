const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');
const path = require('path');

const config = require('./config');

mysql.createPool(config.pool).then(pool => {
  const authRouter = require('./app/routes/authenticate')(express, pool);
  app.use('/authenticate', authRouter);

  const apiRouter = require('./app/routes/api')(express, pool);
  app.use('/api', apiRouter);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/app'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/app/index.html'));
});

app.listen(config.port);

console.log(`Running on port ${config.port}`);
