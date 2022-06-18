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
          if (result[0].role != "teacher") {
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

router.get("/teacher/student", function (req, res) {
  connection.query(
    "SELECT * FROM `users` WHERE `role` = ? ORDER BY `name` ASC",
    "student",
    function (error, result) {
      if (error) throw error;
      res.status(200).json({ data: result });
    }
  );
});

router.post("/teacher/createScore/:studentId", function (req, res) {
  if (req.body.subjectName == "") {
    res.status(200).json({ message: "Subject name is required" });
  } else if (req.body.examDate == "") {
    res.status(200).json({ message: "Exam date is required" });
  } else if (req.body.score == "") {
    res.status(200).json({ message: "Score is required" });
  } else {
    var date = req.body.scoreDate == "" ? new Date() : new Date(req.body.scoreDate);
    var day = date.getDate();
    var month = date.getMonth();
    month = parseInt(month) + 1;
    var year = date.getFullYear();
    date = year + "-" + (month.length < 2 ? '0'+month : month) + "-" + (day.length < 2 ? '0'+day : day);
    connection.query("INSERT INTO `score` (subjectName,examDate,scoreDate,score,comments,studentId) VALUES (?,?,?,?,?,?)",[req.body.subjectName,req.body.examDate,date,req.body.score,req.body.comments,req.params.studentId],function(error,result){
      if(error) throw error;
      res.status(200).json({message:"Score card created"});
    });
  }
});

router.get('/teacher/studentRanking',function(req,res){
  connection.query(
    "SELECT AVG(`score`), `studentId` FROM `score` GROUP BY `studentId` ORDER BY AVG(`score`) DESC",
    function (error, result) {
      if (error) throw error;
      var ranking = [];
      result.map(function (data, index) {
        ranking.push({ rank:index+1,studentId:data.studentId,percent:data['AVG(`score`)'] });
      });
      res.status(200).json({data:ranking})
    }
  );
});

module.exports = router;
