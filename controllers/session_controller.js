exports.loginRequired = function(req, res, next) {
	if(req.session.user) next(); else res.redirect("/login");
};

exports.renderLogin = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	var username = req.session.username || "";
	req.session.username = "";
	
	res.render("sessions/login", {title:"Quiz", errors: errors, username: username});
};

exports.login = function(req, res) {
	var userController = require("./user_controller");
	userController.autenticate(req.body.login, req.body.password, function(err, user) {
	
		if(err) {
			req.session.errors = [{"message": "Se ha producido un error: " + err}];
			req.session.username = req.body.login;
			res.redirect("/login");
			return; // Early return if error.
		}
		
		req.session.user = { // Store user information in session.user.
			id: user.id,
			username: user.username
		};
		
		console.log("REDIR");
		console.log(req.session.redir);
		
		res.redirect(req.session.redir ? req.session.redir.toString() : "/"); // Redirect the user to the previous page.
	});
};

exports.logout = function(req, res) {
	delete req.session.user; // No session.user = NOT LOGGED!
	// TO-DO: req.session.regenerate(function(){...});
	res.redirect(req.session.redir.toString());
};