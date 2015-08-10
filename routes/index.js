var express = require('express');
var path = require('path');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

// INDEX: //////////////////////////////////////////////////////////////////////

/* GET home page
TO-DO: Move to quiz_controller file*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});





// SESSION: ////////////////////////////////////////////////////////////////////

// GET /login
router.get('/login',			sessionController.renderLogin);

// POST /login
router.post('/login',			sessionController.login);

// GET /logout (should be POST -> DELETE /login)
router.get('/logout',			sessionController.logout);





// AUTOLOAD STUFF: /////////////////////////////////////////////////////////////
router.param('quizId',			quizController.load);
router.param('category',		quizController.validate);





// QUESTION CREATION: //////////////////////////////////////////////////////////

// GET /quizes/create
router.get('/quizes/create',					sessionController.loginRequired,	quizController.renderCreate);

// POST /quizes/create
router.post('/quizes/create',					sessionController.loginRequired,	quizController.create);

// QUESTION EDITION: ///////////////////////////////////////////////////////////

// GET /quizes/:quizId(\\d+)/edit
router.get('/quizes/:quizId(\\d+)/edit',		sessionController.loginRequired,	quizController.edit);

// POST -> PUT /quizes/:quizId(\\d+)
router.put('/quizes/:quizId(\\d+)',				sessionController.loginRequired,	quizController.update);

// QUESTION DELETION: //////////////////////////////////////////////////////////

// POST -> DELETE /quizes/:quizId(\\d+)
router.delete('/quizes/:quizId(\\d+)',			sessionController.loginRequired,	quizController.delete);





// PLAYING WITH QUESTIONS (APP ITSELF): ////////////////////////////////////////

router.get('/quizes',							quizController.index);
router.get('/quizes/:quizId(\\d+)',				quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer);
router.get('/quizes/:category',					quizController.index);





// COMMENTS: ///////////////////////////////////////////////////////////////////

router.post('/quizes/:quizId(\\d+)/comments',	commentController.add);





// MISC. ///////////////////////////////////////////////////////////////////////
// TO-DO: Move to misc_controler

/* GET author */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz', author: 'Dani Gámez Franco'});
});





// EXPORTS: ////////////////////////////////////////////////////////////////////

module.exports = router;