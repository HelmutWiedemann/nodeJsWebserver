var server = require("./server");
var router = require("./router");
var requestHandlerHtml = require("./requestHandlerHtml");
var requestHandlerExec = require("./requestHandlerExec");
var requestHandlerIcon = require("./requestHandlerIcon");
var requestHandlerMariasql = require("./requestHandlerMariasql");
var requestHandlerMysql = require("./requestHandlerMysql");

var handle = {}
handle["/"] = requestHandlerHtml.showIndex;
handle["/index.html"] = requestHandlerHtml.showIndex;
handle["/dir"] = requestHandlerExec.dir;
handle["/ls"] = requestHandlerExec.ls;
handle["/favicon.ico"] = requestHandlerIcon.favicon;
handle["/people"] = requestHandlerMariasql.listPeople;
handle["/people_old"] = requestHandlerMysql.listPeople;

function start(){
	server.start(router.route, handle); 
}

exports.start = start;