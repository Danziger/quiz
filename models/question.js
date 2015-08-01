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
		},
		
		// CHANGE TO FK: http://stackoverflow.com/questions/20460270/how-to-make-join-querys-using-sequelize-in-nodejs
		
		category: {
			type: DataTypes.ENUM("otros", "ciencia", "humanidades", "ocio", "tecnología"),
			defaultValue: "otros"
		}
	});
}