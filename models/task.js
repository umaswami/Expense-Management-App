module.exports = function (sequelize, DataTypes) {
	const task = sequelize.define('task',{
	Name : {
		type : DataTypes.STRING(255),
		validate: {}
	},
	Description : {
		type : DataTypes.STRING(255),
		validate: {}
	},
	Amount : {
		type : DataTypes.INTEGER,
		allowNull: false, validate: {notEmpty: true, isNumeric: true}	
	}
},{
	classMethods : {
		associates : function(models) {},
		// get_cities_name : function(req,callback){
		// 	var sql = "select * from cities limit 1";
		// 	Sequalize.query(sql,{raw:true});
		// },
		tableName: 'task',
	    timestamps: true,
	    underscored: true
	}
});
return task;
};