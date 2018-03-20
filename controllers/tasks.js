var tasks = {};
var models = require('../models');

tasks.view_all_task = function(res,res){
	models.task.findAll({
		raw:true
	}).then(function(tasks){
		res.send(tasks);
	}).catch(function(err){
		res.send(err);
	})

}
tasks.add_task = function(req,res){
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
			where : {name:req.body.Name}
		}).then(function(affected_row){
			var msg = {"affected_row": affected_row, "task_id": req.param('task_id')};
			res.send(msg)
		}).catch(function(err){
			res.send(err);
		})
	}
}

tasks.delete_task = function(req,res){
	if(req.param('task_name')){
		models.task.destroy({
			where: {
				name : req.param('task_name')
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
	if(req.param('task_name')){
		models.task.findOne({
			where : {
				name : req.param('task_name')
			}
		}).then(function(task){
			res.send(task);
		}).catch(function(err){
			res.send(err);
		})
	}
}
module.exports = tasks;