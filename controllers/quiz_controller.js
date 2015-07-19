var models = require("../models/models.js");

// GET /quizes

exports.index = function(req, res) {
	models.Question.findAll().then(function(questions) {
		res.render('quizes/index.ejs', {title: 'Quiz', questions: questions});
	});
};

// GET /quizes/:quizId(\\d+)
exports.show = function(req, res) {
	models.Question.find(req.params.quizId).then(function(question) {
		res.render('quizes/show', {title: 'Quiz', question: question});
	});
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function(req, res) {
	models.Question.find(req.params.quizId).then(function(question) {
		if(req.query.respuesta.match(new RegExp(question.response, "i"))) {
			res.render('quizes/answer', {title: 'Quiz', question: question, response: '¡Correcto! :)'});
		}
		else {
			res.render('quizes/answer', {title: 'Quiz', question: question, response: '¡Incorrecto! :('});
		}
	});
};