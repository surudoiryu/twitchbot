/// <reference path="_all.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var indexRoute = require("./routes/index");
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //configure routes
        this.routes();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.config = function () {
        //configure jade
        this.app.set("views", path.join(__dirname, "/dist/app/views"));
        this.app.set("view engine", "jade");
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + "/dist"));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    };
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    Server.prototype.routes = function () {
        //get router
        var router;
        router = express.Router();
        //create routes
        var index = new indexRoute.Index();
        //home page
        router.get("/", index.index.bind(index.index));
        router.get('/test', function (req, res) {
            res.send('im the test page!');
        });
        //use router middleware
        this.app.use(router);
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
