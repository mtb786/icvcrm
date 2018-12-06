// Node Modules Imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
// Configruation Imports
const appConfig = require('./config/app.json');
const dbConfig = require('./config/db.json');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const winston = require('./config/winston');
// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
//  const dir = __dirname;
// // setup the logger
const connectionString = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbname}`;
mongoose.connect(connectionString);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev', { stream: winston.stream }));
app.use('/', routes);
app.use(express.static('../server/dist/icvcrm-web'));

app.listen(appConfig.port,() => {
    console.log('App is started');
});

