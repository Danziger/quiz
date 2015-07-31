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
	var search = (req.query.search || "").trim().replace(/\s+/g, " ");
	
	if(search.length > 0) {	
	
		search = filterAlphabet(search).toLowerCase();
	
		query = {
			where: ["indexedQuestion like ?", "%" + search.replace(/\s+/g, "%") + "%"],
			order: "indexedQuestion ASC" // This will guarantee same order independently of capital letters
		};
	}
	else {
		query = {
			order: "indexedQuestion ASC"
		};
	}

	models.Question.findAll(query).then(function(questions) {
		res.render('quizes/index', {title: 'Quiz', questions: questions, search: search});
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
	var state = filterAlphabet(response).match(new RegExp(req.question.responseRegExp, "i")) ? "ok" : "wrong";
	res.render('quizes/answer', {title: 'Quiz', question: req.question, response: (state === "ok" ? req.question.response : response), state: state});

	// TO-DO: Check for PERFECT match too!
};

// AUX. DATA SANITIZATION : ////////////////////////////////////////////////////

function filterAlphabet(str) {
	var translate = {
		"á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
		"à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u",
		"ä":"a", "ë":"e", "ï":"i", "ö":"o", "ü":"u",
		"â":"a", "ê":"e", "î":"i", "ô":"o", "û":"u",
		"Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",
		"À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U",
		"Ä":"A", "Ë":"E", "Ï":"I", "Ö":"O", "Ü":"U",
		"Â":"A", "Ê":"E", "Î":"I", "Ô":"O", "Û":"U",
		"ñ":"n", "Ñ":"N", "ç":"c", "Ç":"C", "·":"."
	};
	
	return str.replace(/[áéíóúàèìùòäëïöüâêîôûÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛñÑçÇ·]/g, function(match) { 
		return translate[match]; 
	});
};

// CREATION: ///////////////////////////////////////////////////////////////////

// GET /quizes/create
exports.renderCreate = function(req ,res) {
	res.render('quizes/create', {
		title: 'Quiz',
		question: models.Question.build()
	});
};

// POST /quizes/create
exports.create = function(req ,res) {
	var question = models.Question.build( req.body.question );
	
	question.validate().then(function(err) {
		if(err) {
			res.render("quizes/create", {title: 'Quiz', question: question, errors: err.errors});
		}
		else {
			
			console.log("LOG:");
			console.log(question);
			console.log(question.response);
			console.log("END LOG.");
		
			// TO-DO: Antes de guardar (Y TAMBIÉN COMPROBAR) eliminar carácteres conflictivos como acentos, Ñ, etc.
			// TO-DO: Escapar otros carácteres que puedan dar conflictos...
			// TO-DO: Botón cancelar = enlace a la lista de preguntas!
			// TO-DO: Remove first question tag for sorting...
		
			question.indexedQuestion = filterAlphabet(question.question).toLowerCase();
			question.responseRegExp = "^\\s*" + filterAlphabet(question.response).replace(/\s/g,"\\s+") + "\\s*$";
			question.save({fields: ["question", "indexedQuestion", "response", "responseRegExp"]}).then(function() {
				res.redirect("/quizes");
			});
		}
	});
};

// EDITION: ////////////////////////////////////////////////////////////////////

// GET /quizes/:quizId/edit

exports.edit = function(req, res) {
	res.render('quizes/edit', {
		title: 'Quiz',
		question: req.question
	});
}

// POST -> PUT /quizes/:quizId

exports.update = function(req, res) {

	console.log("AAA");

	req.question.question = req.body.question.question;
	req.question.response = req.body.question.response;
	
	req.question.validate().then(function(err) {
		if(err) {
			res.render("quizes/edit", {title: 'Quiz', question: req.question, errors: err.errors});
			// TO-DO: Eliminar tachado si editas una pregunta que no ha validado!
		}
		else {
			
			console.log("LOG:");
			console.log(req.question);
			console.log(req.question.response);
			console.log("END LOG.");
		
			// TO-DO: Antes de guardar (Y TAMBIÉN COMPROBAR) eliminar carácteres conflictivos como acentos, Ñ, etc.
			// TO-DO: Escapar otros carácteres que puedan dar conflictos...
			// TO-DO: Botón cancelar = enlace a la lista de preguntas!
		
			req.question.indexedQuestion = filterAlphabet(req.question.question).toLowerCase();
			req.question.responseRegExp = "^\\s*" + filterAlphabet(req.question.response).replace(/\s/g,"\\s+") + "\\s*$";
			req.question.save({fields: ["question", "indexedQuestion", "response", "responseRegExp"]}).then(function() {
				res.redirect("/quizes");
			});
		}
	});
};