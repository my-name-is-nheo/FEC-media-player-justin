const express = require("express");
const mysql = require("mysql");
var cors = require("cors");
const app = express();
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "media"
});
connection.connect(err => {
  if (err) {
    console.log(err);
  }
});
var whitelist = ["http://localhost:3306/songs"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(express.static("../client/dist"));
app.get("/", cors(corsOptions), (req, res) => {
  res.send("this works");
});
app.get("/songs", (req, res) => {
  connection.query(`SELECT * FROM songs ORDER BY RAND()`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});
app.listen(3306, () => {
  console.log("media server listening on 3306");
});
