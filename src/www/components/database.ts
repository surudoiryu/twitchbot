class Database
{
    create() {
        //var file = process.env.DB_DIR + "/" + this.tmiOptions.channels[0] + ".db";
        /*var exists = sqldb.existsSync(file);
        if(!exists) {
            try {
                console.log("Creating DB file.");
                sqldb.openSync(file, "w");
            } catch(e) {
                console.log("DB file couldn't be created!");
            }
        }
*/

  //      var sqlite3 = require("sqlite3").verbose();
    //    var db = new sqlite3.Database(file);
        /*
        db.serialize(function() {
            if(!exists) {
                db.run("CREATE TABLE " + this.tmiOptions.channels[0] + " (id INTEGER PRIMARY KEY, name TEXT, points INTEGER, minutes INTEGER, created_at TEXT)");
            }
        }
        */
    }

    connnect() {

    }
    addMinute() {

    }
    AddPoint() {

    }
    AddPoints(points:number) {

    }
}
