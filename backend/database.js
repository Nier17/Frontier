var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/frontier";

// MongoClient.connect(url, function(err, db) {
//     if(err) throw err;
//     var dbo = db.db("mydb");
//     console.log('DB MONGODB CONNECTED');
// });

module.exports = MongoClient;