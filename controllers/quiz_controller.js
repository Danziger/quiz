var models = require("../models/models.js");

// Autoload for routes that contain :quizId
// DRY (Don't Repeat Yourself)
exports.load = function(req, res, next, quizId) {
	models.Question.find(quizId).then(function(question) {
		if(question) {
			req.question = question;
			next();
		}
		else {
			next(new Error("No question with id = " + quizId));
		}
	}).catch(function(err){
		next(err);
	});
};

// GET /quizes
exports.index = function(req, res, next) {

	var query = {};
	var search = req.query.search;
	
	if(search) {
		search = "%" + search.replace(/\s/g, "%") + "%";
		query = {where: ["question like ?", search]};
	}

	models.Question.findAll(query).then(function(questions) {
		res.render('quizes/index.ejs', {title: 'Quiz', questions: questions});
	}).catch(function(err){
		next(err);
	});
};

// GET /quizes/:quizId(\\d+)
exports.show = function(req, res) {
	res.render('quizes/show', {title: 'Quiz', question: req.question});
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function(req, res) {
	if(req.query.respuesta.match(new RegExp(req.question.response, "i")))
		var response = '¡Correcto! :)';
	else 
		var response = '¡Incorrecto! :(';
	
	res.render('quizes/answer', {title: 'Quiz', question: req.question, response: response});
};