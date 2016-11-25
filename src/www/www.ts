/// <reference path="../app/_all.d.ts" />
/// <reference path="../../typings/index.d.ts" />
/// <reference path="components/connect.ts"/>
/// <reference path="components/chatting.ts"/>
"use strict";

//module dependencies.
var dotenv = require("dotenv").config();
var app = require("../app");
var debug = require("debug")("express:server");
var http = require("http");
var tmi = require("tmi.js");
var sqldb = require("fs.js");

class TwitchBot {

  tmiOptions: any = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
      username: process.env.TWITCH_USER, // Twitchname of your bot (create a profile)
      password: process.env.TWITCH_PASS // Get your Token here: http://twitchapps.com/tmi/
    },
    channels: [ "#" + process.env.TWITCH_CHANNEL ]
  }
  botClient: any = new tmi.client(this.tmiOptions);

  constructor() {
  }

}

var conn = new Connect();
conn.connnectBot();


//get port from environment and store in Express.
var port = normalizePort(process.env.PORT || 8080);
app.set("port", port);


//create http server
var server = http.createServer(app);

//listen on provided ports
server.listen(port);

//add error handler
server.on("error", onError);

//start listening on port
server.on("listening", onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val): any {
  var port: number = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error : any): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind:string = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  var addr:any = server.address();
  var bind:string = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;
  debug("Listening on " + bind);
}
