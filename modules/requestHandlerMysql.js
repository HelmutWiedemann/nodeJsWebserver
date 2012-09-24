var mysql = require('mysql');
var MySQLPool = require("mysql-pool").MySQLPool;
var myArgs = require('optimist').argv,
     help = 'Following parameter are supported --user --database';

// default values
var options = {
	user: 'root',
	password: '',
	database: 'test',
	host:     'localhost',
	poolSize: 4
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


var pool = new MySQLPool(options);




function listPeople(req,res){
	pool.query("select count(*) as count from people", function(err, results, fields){
		var randId = results[0].count; //TODO generate a random between 0 and count
			pool.query("insert into requests (timestamp, agent, person_id) values (NOW(),?,?);",[req.headers['user-agent'],randId], function(e){
				pool.query("SELECT * from people", 
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