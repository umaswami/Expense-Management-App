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

  // SQLite only
  //storage: 'path/to/database.sqlite'
});


app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(express.static(path.join(__dirname,'views')));

// app.get('/',function(req,res){  
//      res.sendFile('home.html');
// });

app.post('/add/task',controllers.tasks.add_task);

app.post('/update/task/:task_id',controllers.tasks.update_task);

app.delete('/delete/task/:task_id',controllers.tasks.delete_task);

app.get('/view/task/:task_id',controllers.tasks.view_task);

app.listen(process.env.PORT || 3012);
console.log('------listening on port 3012');

module.exports = sequelize;
module.exports = app;

