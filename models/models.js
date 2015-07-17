var 	path 		= require("path"),
		Sequelize 	= require("sequelize");

var sequelize = new Sequelize(null, null, null, {
	dialect: "sqlite",
	storage: "quiz.sqlite"
});

var Question = sequelize.import(path.join(__dirname, "quiz"));

exports.Question = Question;

sequelize.sync().success(function() {
	Question.count().success(function(count) {
		if(count === 0) {
			Question.create({
				question: "¿Capital de Italia?",
				response: "^\\s*roma\\s*$"
			}).success(function() {
				console.log("DB successfully initialized!");
			});
		}
	});
});