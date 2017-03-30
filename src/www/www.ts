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
var socketIO = require("socket.io");
var tmi = require("tmi.js");
//var sqldb = require("fs");

class TwitchBot {

  private io: any;
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

    this.io = socketIO();
    this.io.serveClient( true );
    this.io.attach( this.server );

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


    this.io.on('connection', (client) => {
      console.log('socket tunnel created with id:'+client.id);
      client.emit('message', 'hellooo from the serverrrr sideeeeee', 'event');
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
