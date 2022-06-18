const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sourcenode"
});
con.connect((err) => {

    if (err) {

        throw err;

    }

});
module.exports = {
    connection: con
} 