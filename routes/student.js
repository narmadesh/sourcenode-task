const express = require("express");
const router = express.Router();
const config = require("../database/connection");
const connection = config.connection;

router.use(function (req, res, next) {
  if (!req.headers["auth_token"] || req.headers["auth_token"] == "") {
    res.status(401).json({ message: "Please provide auth token" });
  } else {
    connection.query(
      "SELECT * FROM `users` WHERE `auth_token` = ?",
      req.headers["auth_token"],
      function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          if (result[0].role != "student") {
            res.status(401).json({ message: result[0].role });
          } else {
            return next();
          }
        } else {
          res.status(401).json({ message: "Invalid auth token" });
        }
      }
    );
  }
});

router.get('/student/scoreCard/:studentId',function(req,res){
  connection.query(
    "SELECT * FROM `score` where `studentId` = ?",req.params.studentId,
    function (error, result) {
      if (error) throw error;
      res.status(200).json({data:result})
    }
  );
});

module.exports = router;
