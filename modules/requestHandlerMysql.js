var mysql = require('mysql');

var client = mysql.createClient({
	user: 'root',
	password: ''
});

client.useDatabase('test');

function listPeople(req,res){
	client.query("select count(*) as count from people", function(err, results, fields){
		var randId = results[0].count; //TODO generate a random between 0 and count
			client.query("insert into requests (timestamp, agent, person_id) values (NOW(),?,?);",[req.headers['user-agent'],randId], function(e){
				client.query("SELECT * from people", 
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

exports.listPeople = listPeople;