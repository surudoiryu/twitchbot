/// <reference path="_all.d.ts" />
"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";

import * as indexRoute from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();
    //configure application
    this.config();
    //configure routes
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   * @return void
   */
  private config() {
    //configure jade
    this.app.set("views", path.join(__dirname, "/dist/app/views"));
    this.app.set("view engine", "jade");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(__dirname + "/dist"));
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error("Not Found");
      err.status = 404;
      next(err);
    });
  }

  /**
   * Configure routes
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    //get router
    let router: express.Router;
    router = express.Router();

    //create routes
    var index: indexRoute.Index = new indexRoute.Index();

    //home page
    router.get("/", index.index.bind(index.index));

    router.get('/test', function(req, res) {
      res.send('im the test page!');
    });

    //use router middleware
    this.app.use(router);
  }
}

var server = Server.bootstrap();
module.exports = server.app;
