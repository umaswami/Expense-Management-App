module.exports = function (sequelize, DataTypes) {
	const task = sequelize.define('task',{
	Name : {
		type : DataTypes.STRING(255),
		validate: {notEmpty: true}
	},
	Description : {
		type : DataTypes.STRING(255),
		validate: {notEmpty: true}
	},
	Amount : {
		type : DataTypes.INTEGER,
		allowNull: false, validate: {notEmpty: true, isNumeric: true}	
	}
},{
	classMethods : {
		associates : function(models) {},
		tableName: 'task',
	    timestamps: true,
	    underscored: true
	}
});
return task;
};