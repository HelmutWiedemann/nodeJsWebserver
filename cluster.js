var cluster = require('cluster');
var numCPUs = 2;//require('os').cpus().length;

var child = require("./modules/child");

cluster.on('listening', function(worker, address) {
  console.log("A worker (pid="+worker.process.pid+") is now connected to " + address.address + ":" + address.port);
});

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  child.start(); 
}