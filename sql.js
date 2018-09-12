var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sankamille",
  password: "jesuisunbg",
  database: "LearnTheCall"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.con = con; 