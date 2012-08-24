var server = require("./modules/server");
var router = require("./modules/router");
var requestHandlerHtml = require("./modules/requestHandlerHtml");
var requestHandlerExec = require("./modules/requestHandlerExec");
var requestHandlerIcon = require("./modules/requestHandlerIcon");
var requestHandlerMysql = require("./modules/requestHandlerMysql");

var handle = {}
handle["/"] = requestHandlerHtml.showIndex;
handle["/index.html"] = requestHandlerHtml.showIndex;
handle["/dir"] = requestHandlerExec.dir;
handle["/ls"] = requestHandlerExec.ls;
handle["/favicon.ico"] = requestHandlerIcon.favicon;
handle["/people"] = requestHandlerMysql.listPeople;

server.start(router.route, handle); 