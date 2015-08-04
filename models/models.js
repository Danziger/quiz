var path = require("path"),
	Sequelize = require("sequelize");

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;	

// Load ORM model:
var sequelize = new Sequelize(DB_name, user, pwd, {
	dialect: protocol,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage, // for SQLite (.env) only
	omitNull: true // for Postgres only
});

var Question = sequelize.import(path.join(__dirname, "question"));
var Comment = sequelize.import(path.join(__dirname, "comment"));

sequelize.sync().then(function() {
	Question.count().then(function(count) {
		if(count === 0) {
			Question.create({
				question: "¿Capital de Italia?",
				indexedQuestion: "¿capital de italia?",
				response: "Roma",
				responseRegExp: "^\\s*Roma\\s*$"
			});
			Question.create({
				question: "¿Capital de Portugal?",
				indexedQuestion: "¿capital de portugal?",
				response: "Lisboa",
				responseRegExp: "^\\s*Lisboa\\s*$"
			}).then(function() {
				console.log("DB successfully initialized!");
			});
		}
	});
});

Comment.belongsTo(Question);
Question.hasMany(Comment);

exports.Question = Question;
exports.Comment = Comment;

// TO-DO: USE perfect reponse! Sustituir por ella cuando acertamos aproximado!