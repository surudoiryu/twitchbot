/// <reference path="../_all.d.ts" />
"use strict";
var Route;
(function (Route) {
    var Index = (function () {
        function Index() {
        }
        Index.prototype.index = function (req, res, next) {
            //render page
            res.render("index");
        };
        return Index;
    }());
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
