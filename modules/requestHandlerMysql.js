var mysql = require('mysql'),
	async = require('async');
//var MySQLPool = require("mysql-pool").MySQLPool;
var myArgs = require('optimist').argv,
     help = 'Following parameter are supported --user --database';

// default values
var options = {
	user: 'root',
	password: '',
	database: 'test',
	host:     'localhost',
	poolSize: 25
}

	 
 if ((myArgs.h)||(myArgs.help)) {
   console.log(help);
   process.exit(0);
 }
function setOptionArg(key){
	if(myArgs[key]){
		options[key] = myArgs[key];
		console.log(myArgs[key]);
		
	}
}

setOptionArg("user");
setOptionArg("database");
setOptionArg("host");
setOptionArg("password");





function getRandom(min, max) {
 if(min > max) {
  return -1;
 }
 
 if(min == max) {
  return min;
 }
 
 var r;
 
 do {
  r = Math.random();
 }
 while(r == 1.0);
 
 return min + parseInt(r * (max-min+1));
}

var connection = mysql.createConnection(options);

function listPeople(req,res){

	connection.query("select count(*) as count from people", function(err, results, fields){
		if(err){
			res.writeHead(500, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({error: err}));
			console.log("error",err)
			return;
		}
		var randId = getRandom(0,results[0].count);
			connection.query("insert into requests (timestamp, agent, person_id) values (NOW(),?,?);",[req.headers['user-agent'],randId], function(err, results, fields){
				if(err){
					res.writeHead(500, {'Content-Type': 'application/json'});
					res.end(JSON.stringify({error: err}));
				}
				connection.query("SELECT * from people", 
					function(err, results, fields) {
						if (err){
							res.writeHead(500, {'Content-Type': 'application/json'});
							res.end(JSON.stringify({error: err}));
						} else {
							res.writeHead(200, {'Content-Type': 'application/json'});
							res.end(JSON.stringify(results));
						}
					}
				);
			});
	})
}

exports.listPeople = listPeople