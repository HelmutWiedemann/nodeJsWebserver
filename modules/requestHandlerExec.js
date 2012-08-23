var exec = require("child_process").exec;
var fs = require("fs");

function dir(response) {
	console.log("Request handler 'dir' was called.");
	exec("dir", function(error, stdout, stderr) {
		response.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		response.write(stdout);
		response.end();
	});
}

function ls(response) {
	console.log("Request handler 'ls' was called.");
	exec("ls", function(error, stdout, stderr) {
		response.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		response.write(stdout);
		response.end();
	});
}

exports.dir = dir;
exports.ls = ls