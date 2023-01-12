const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const jsonParser = bodyParser.json();

app.use(express.static("./static"));

//database config
const con = mysql.createConnection({
  host: "localhost",
  user: "root", // change this based on local creds
  password: "donotenterbitch", // change this based on local creds
});

con.connect((err) => {
  con.query("USE tweets");
});

//handle requests from the front

// fetch tweets from server
app.get("/tweets", (req, res) => {
  //connect to database and fetch data
  con.connect((err) => {
    const sql = "SELECT * FROM tweets.sql_tweets";
    con.query(sql, async (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  });
});

// store responses into server
app.post("/response", jsonParser, (req, res) => {
  // store data from the front end

  const data = req.body;
  const id = data.id;
  const word = data.word;

  console.log(data);

  // connect to database and store data
  con.connect((err) => {
    const sql = `UPDATE sql_tweets SET scam = '${word}' WHERE tweet_id = ${id};`;
    con.query(sql, async (err, result) => {
      if (err) throw err;
      res.status(200).send(result);
    });
  });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
