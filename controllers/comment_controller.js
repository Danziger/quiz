var models = require("../models/models.js");

// POST /quizes/:quizId/comments
exports.add = function(req, res) {

	console.log("COMMENT!!!");
	console.log(req.body.comment.text);
	console.log(req.params.quizId);

	var comment = models.Comment.build({
		text: req.body.comment.text,
		QuestionId: req.params.quizId
	});
	
	comment.validate().then(function(err) {
		if(err) {
			res.render("comments/add", {
				title: 'Quiz',
				quizId: req.params.quizId,
				errors: err.errors
			});
		}
		else {
			comment.save().then(function(){
				res.redirect("/quizes/" + req.params.quizId);
			});
		}
	});
};

exports.load = function(req, res, next, commentId) {

	console.log("AAAAAA");

	models.Comment.find({
		where: {id: Number(commentId)}
	}).then(function(comment){
		if(comment) {
			req.comment = comment;
			next();
		}
		else {
			next(new Error("No existe commentId = " + commentId));
		}
	}).catch(function(error){
		next(error);
	});

};

// GET -> PUT /quizes/:quizId(\\d+)/comments/:commentId(\\d+)
exports.publish = function(req, res) {

	req.comment.published = true;
	
	req.comment.save({fields: ["published"]}).then(function(){
		res.redirect("/quizes/" + req.params.quizId);
	}).catch(function(error){
		next(error);
	});
};