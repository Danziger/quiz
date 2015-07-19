var express = require('express');
var path = require('path');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload :quizId
router.param('quizId', quizController.load);

/* Quiz APP */
router.get('/quizes',						quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

/* GET author */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz', author: 'Dani Gámez Franco'});
});

module.exports = router;
