var models = require("../models/models.js");

// GET /quizes/question
exports.question = function(req, res) {
	models.Question.findAll().success(function(question) {
		res.render('quizes/question', {title: 'Quiz', pregunta: question[0].question});
	});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	models.Question.findAll().success(function(question) {
		if(req.query.respuesta.match(new RegExp(question[0].response, "i"))) {
			res.render('quizes/answer', {title: 'Quiz', respuesta: '¡Correcto! :)'});
		}
		else {
			res.render('quizes/answer', {title: 'Quiz', respuesta: '¡Incorrecto! :('});
		}
	});
};