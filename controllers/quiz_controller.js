// GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {title: 'Quiz', pregunta: 'Capital de Italia:'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	if(req.query.respuesta.match(/^\s*roma\s*$/i)) {
		res.render('quizes/answer', {title: 'Quiz', respuesta: '¡Correcto! :)'});
	}
	else {
		res.render('quizes/answer', {title: 'Quiz', respuesta: '¡Incorrecto! :('});
	}
};