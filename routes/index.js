var express = require('express');
var path = require('path');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload :quizId
router.param('quizId',						quizController.load);
router.param('category',					quizController.validate);

/* Quiz APP */
router.get('/quizes',						quizController.index);
router.get('/quizes/:category',				quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);



// CREATION: ///////////////////////////////////////////////////////////////////

// GET /quizes/create
router.get('/quizes/create',	quizController.renderCreate);

// POST /quizes/create
router.post('/quizes/create',	quizController.create);



// EDITION: ////////////////////////////////////////////////////////////////////

// GET /quizes/:quizId(\\d+)/edit
router.get('/quizes/:quizId(\\d+)/edit',	quizController.edit);

// POST -> PUT /quizes/:quizId(\\d+)
router.put('/quizes/:quizId(\\d+)',			quizController.update);



// DELTION: ////////////////////////////////////////////////////////////////////

// POST -> DELETE /quizes/:quizId(\\d+)
router.delete('/quizes/:quizId(\\d+)',		quizController.delete);



// MISC. ///////////////////////////////////////////////////////////////////////

/* GET author */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz', author: 'Dani Gámez Franco'});
});

module.exports = router;
