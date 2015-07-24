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
		query = {where: ["question like ?", "%" + search.replace(/\s/g, "%") + "%"]};
	}

	models.Question.findAll(query).then(function(questions) {
		res.render('quizes/index', {title: 'Quiz', questions: questions, search: search || ""});
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
	var response = req.query.respuesta;
	var state = response.match(new RegExp(req.question.response, "i")) ? "ok" : "wrong";
	res.render('quizes/answer', {title: 'Quiz', question: req.question, response: response, state: state});
};