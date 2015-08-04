// Comment model definition

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Comment", {
		text: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "El comentario no puede estar vacío."}
			}
		}
	});
}