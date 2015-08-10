var users = { // Placeholder
	admin: {
		id: 1,
		username: "admin",
		password: "1234"
	},
	pepe: {
		id: 2,
		username: "pepe",
		password: "1234"
	}
};

exports.autenticate = function(username, password, callback) {

	var candidate = users[username];

	if(candidate && candidate.password === password) {
		callback(null, candidate);
	}
	else {
		callback(new Error("No existe el usuario."));
	}
};