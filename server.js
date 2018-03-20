var express = require('express');
var app = express();
var path    = require("path");
var controllers = require("./controllers");
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('management', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname,'views')));

app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Custom-Header");
        res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
        next();
});

app.get('/view/all/task',controllers.tasks.view_all_task);

app.post('/add/task',controllers.tasks.add_task);

app.post('/update/task',controllers.tasks.update_task);

app.delete('/delete/task/:task_name',controllers.tasks.delete_task);

app.get('/view/task/:task_name',controllers.tasks.view_task);

app.listen(process.env.PORT || 3012);
console.log('------listening on port 3012');

module.exports = sequelize;
module.exports = app;

