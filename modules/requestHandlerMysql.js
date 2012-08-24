var mysql = require('mysql');

var client = mysql.createClient({
	user: 'root',
	password: ''
});

client.useDatabase('test');

function listPeople(res){
	client.query("SELECT * from people", 
		function(err, results, fields) {
			if (err) throw err;
				
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(results));
		}
	);
}

exports.listPeople = listPeople;