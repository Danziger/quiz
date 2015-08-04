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