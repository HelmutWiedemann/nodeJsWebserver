var fs = require("fs");

function favicon(response) {
	fs.readFile("ico/favicon.ico", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {
				"Content-Type" : "text/plain"
			});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {
				"Content-Type" : "image/x-icon"
			});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.favicon = favicon