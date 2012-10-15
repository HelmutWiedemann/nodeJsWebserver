var	async = require('async');
var Client = require('mariasql');

var c = new Client();
//var MySQLPool = require("mysql-pool").MySQLPool;
var myArgs = require('optimist').argv,
     help = 'Following parameter are supported --user --db';

// default values
var options = {
	user: 'root',
	password: '',
	db: 'test',
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
setOptionArg("db");
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


c.connect(options);
var pCount = c.prepare("select count(*) as count from people");
var pInsert = c.prepare("insert into requests (timestamp, agent, person_id) values (NOW(),:agent,:person_id);")
var pSelect = c.prepare("SELECT * from people");

	c.on('connect', function() {
	   console.log('Client connected');
	 })
	 .on('error', function(err) {
	   console.log('Client error: ' + err);
	 })
	 .on('close', function(hadError) {
	   console.log('Client closed');
	 });

function listPeople(req,response){

	function genericErrorHandler(err){
		response.writeHead(500, {'Content-Type': 'application/json'});
		response.end(JSON.stringify({error: err}));
		console.log("error",err)
		return;
	}

	c.query(pCount()).on("result",function(result){
		result.on("row", function(row){
			var randId = getRandom(0,row.count);
			c.query(pInsert({agent: req.headers['user-agent'], person_id: randId})).on("result",function(result){
				c.query(pSelect()).on("result",function(result) {
					var rows = [];
					result.on("row", function(row){
						rows.push(row);
					}).on("end", function(){
						response.writeHead(200, {'Content-Type': 'application/json'});
						response.end(JSON.stringify(rows));
					})
							
				});
			});
		})
		
	}).on("error", genericErrorHandler);
	
}

exports.listPeople = listPeople