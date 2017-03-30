/// <reference path="../app/_all.d.ts" />
/// <reference path="../../typings/index.d.ts" />
"use strict";

import { Settings } from './components/settings';
import { Connect } from './components/connect';

//module dependencies.
var dotenv = require("dotenv").config();
var app = require("../app");
var debug = require("debug")("express:server");
var http = require("http");
var tmi = require("tmi.js");
//var sqldb = require("fs");

class TwitchBot {

  private server: any;
  private port: any;

  private tmiOptions: any = new Settings().tmiOptions();

  constructor() {
    console.log("Starting the bot, hold on...");
    let connect = new Connect( new tmi.client(this.tmiOptions), this.tmiOptions );
    connect.Connect();

    //get port from environment and store in Express.
    this.port = this.normalizePort(process.env.PORT || 8080);
    app.set("port", this.port);

    //create http server
    this.server = http.createServer(app);

    //listen on provided ports
    this.server.listen(this.port);

    //add error handler
    this.server.on("error", (error: any) => {
      if (error.syscall !== "listen") {
        console.error(error);
        throw error;
      }

      var bind:string = typeof this.port === "string"
        ? "Pipe " + this.port
        : "Port " + this.port;

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
    });

    //start listening on port
    this.server.on("listening", () => {
      let addr:any = this.server.address();
      console.log(addr.address+":"+addr.port+" is now callable!");
      let bind:string = typeof this.port === "string"
        ? "Pipe " + this.port
        : "Port " + this.port;
      debug("Listening on " + bind);
    });
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  normalizePort(val): any {
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
}

let tb = new TwitchBot();

//var conn = new Connect();
//conn.connnectBot();

/*
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
*/

/**
 * Normalize a port into a number, string, or false.
 */ /*
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
*/
/**
 * Event listener for HTTP server "error" event.
 */ /*
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
*/
/**
 * Event listener for HTTP server "listening" event.
 */ /*
function onListening(): void {
  var addr:any = server.address();
  var bind:string = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;
  debug("Listening on " + bind);
}
*/
