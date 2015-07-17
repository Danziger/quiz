// Question model definition

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Question", {
		question: DataTypes.STRING,
		response: DataTypes.STRING,
	});
}