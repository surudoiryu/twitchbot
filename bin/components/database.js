var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Database = (function (_super) {
    __extends(Database, _super);
    function Database() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Database.prototype.create = function () {
        var file = process.env.DB_DIR + "/" + this.tmiOptions.channels[0] + ".db";
        var exists = sqldb.existsSync(file);
        if (!exists) {
            try {
                console.log("Creating DB file.");
                sqldb.openSync(file, "w");
            }
            catch (e) {
                console.log("DB file couldn't be created!");
            }
        }
        var sqlite3 = require("sqlite3").verbose();
        var db = new sqlite3.Database(file);
        /*
        db.serialize(function() {
            if(!exists) {
                db.run("CREATE TABLE " + this.tmiOptions.channels[0] + " (id INTEGER PRIMARY KEY, name TEXT, points INTEGER, minutes INTEGER, created_at TEXT)");
            }
        }
        */
    };
    return Database;
}(TwitchBot));
