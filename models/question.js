// Question model definition

module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Question", {
		question: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "Debes escribir una pregunta."}
			},
			defaultValue: ""
		},
		indexedQuestion: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		response: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "Debes añadir la respuesta a la pregunta."}
			},
			defaultValue: ""
		},
		responseRegExp: {
			type: DataTypes.STRING,
			defaultValue: ""
		}
	});
}