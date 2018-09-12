var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sankamille",
  password: "jesuisunbg",
  db: "IG_user"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.con = con; 