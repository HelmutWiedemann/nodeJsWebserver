var server = require("./server");
var router = require("./router");
var requestHandlerHtml = require("./requestHandlerHtml");
var requestHandlerExec = require("./requestHandlerExec");
var requestHandlerIcon = require("./requestHandlerIcon");
var requestHandlerMysql = require("./requestHandlerMariasql");

var handle = {}
handle["/"] = requestHandlerHtml.showIndex;
handle["/index.html"] = requestHandlerHtml.showIndex;
handle["/dir"] = requestHandlerExec.dir;
handle["/ls"] = requestHandlerExec.ls;
handle["/favicon.ico"] = requestHandlerIcon.favicon;
handle["/people"] = requestHandlerMysql.listPeople;

function start(){
	server.start(router.route, handle); 
}

exports.start = start;