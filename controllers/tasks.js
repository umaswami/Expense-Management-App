var tasks = {};
var models = require('../models');

//console.log('--------models',JSON.stringify(models));
tasks.add_task = function(req,res){
	console.log('------params',req.params);
	console.log('---------inside post',req.body);
	if(req.body){
		models.task.create(req.body).then(function(task){
			res.send(task.get())
		}).catch(function(err){
			res.send(err);
		})
	}
}

tasks.update_task = function(req,res){
	if(req.body){
		models.task.update(req.body,{
			where : {id:req.param('task_id')}
		}).then(function(affected_row){
			var msg = {"affected_row": affected_row, "task_id": req.param('task_id')};
			res.send(msg)
		}).catch(function(err){
			res.send(err);
		})
	}
}

tasks.delete_task = function(req,res){
	if(req.param('task_id')){
		models.task.delete({
			where: {
				id : req.param('task_id')
			}
		}).then(function(affected_row){
			var msg = {"affected_row":affected_row, "task_id":req.params('task_id')};
			res.send(msg);
		}).catch(function(err){
			res.send(err);
		})
	}
}

tasks.view_task = function(req,res){
	if(req.param('task_id')){
		models.task.findOne({
			where : {
				id : req.param('task_id')
			}
		}).then(function(task){
			res.send(task);
		}).catch(function(err){
			res.send(err);
		})
	}
}
module.exports = tasks;