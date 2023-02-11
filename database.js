const { ThreadChannel } = require("discord.js");
const fs = require("node:fs");
const sqlite3 = require('sqlite3').verbose();

const schemaPath = 'schema.txt';
const dbPath = 'data/test.db';
const dbEditTable = 'edits';

module.exports = {
    setup: function () {
      	// setup database
        let db = new sqlite3.Database(dbPath);

        // Setup edits table, if it hasn't been done already
        initDB(db, dbEditTable).then(cat => {
            console.log('hi');
            let editsCount = 0;
            // Get number of edits that have been run
            db.get('select count(editID) as editCount from edits', 
            {}, (err, row) => {
                
                editsCount = row.editCount;
                console.log(editsCount);
                console.log(row.editCount);
            });
    
            // Run database setup commands
            fs.readFile(schemaPath, function(err, f){
                var sqlCommands = f.toString().split('^');
    
                // Remove whitespace
                for (let i = 0; i < sqlCommands.length; i++) {
                    sqlCommands[i] = sqlCommands[i].trim();
                } 
                // Run edits that have not been run previously
                for (let i = editsCount; i < sqlCommands.length; i++) {
                    db.run(sqlCommands[i]);
                    // Log the edit
                    db.run('INSERT INTO ' + dbEditTable + '(editDate)'
                        + ' VALUES(datetime(\'now\', \'localtime\'));');
                }
                // console.log(sqlCommands[0]);
                // console.log(sqlCommands[1]);
            });
    
            db.close();
        });
    }
};

function initDB(db, editTable) {
    return new Promise((resolve, reject) => {
        // Check if any tables exist
        db.get('SELECT count(name) as count FROM sqlite_master WHERE type=$type', 
        {
            $type: 'table'
        }, 
        (err, row) => {
            createDB(db, editTable, row).then(() => {
                resolve();
            });
        });
    });
}

function createDB(db, editTable, row) {
    return new Promise((resolve, reject) => {
        // Empty database
        if (row.count === 0) {
            // Create edits table
            db.run('CREATE TABLE ' + editTable + ' (' // Can't seem to use parameters when creating a table
                + ' editID INTEGER PRIMARY KEY,'
                + ' editDate TEXT NOT NULL'
                + ' );', {}, (err) => {
                // Insert intial database edit
                db.run('INSERT INTO ' + editTable + '(editDate)'
                    + ' VALUES(datetime(\'now\', \'localtime\'));');
                }, {}, (err) => {
                    resolve();
                });
        }
        else {
            resolve();
        }
    });
}