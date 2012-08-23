var fs = require("fs");

function showIndex(response) {
	fs.readFile("html/index.html", function(error, file) {
		if (error) {
			response.writeHead(500, {
				"Content-Type" : "text/plain"
			});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {
				"Content-Type" : "text/html"
			});
			response.write(file, "text");
			response.end();
		}
	});
}

exports.showIndex = showIndex;
