const express = require('express');
const router = express.Router();
const config = require('../database/connection');
const connection = config.connection;

router.use(function (req, res, next) {
    if (!req.headers['auth_token'] || req.headers['auth_token'] == "") {
        res.status(401).json({ message: "Please provide auth token" });
    }
    else {
        connection.query('SELECT * FROM `users` WHERE `auth_token` = ?', req.headers['auth_token'], function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                if (result[0].role != "admin") {
                    res.status(401).json({ message: "Unauthorized" });
                }
                else {
                    return next();
                }
            }
            else {
                res.status(401).json({ message: "Invalid auth token" });
            }
        });
    }
});

router.post('/admin/class',function(req,res){
    if(!req.body.className || req.body.className == ""){
        res.status(200).json({message:"Class name is required"});
    }
    else{
        connection.query("INSERT INTO `class` (className) VALUES (?)",[req.body.className],function(error,result){
            if(error) throw error;
            res.status(200).json({message:"class added",id:result.insertId});
        });
    }
});

router.get('/admin/class',function(req,res){
    connection.query("SELECT * FROM `class`",function(error,result){
        if(error) throw error;
        res.status(200).json({data:result});
    });
});

router.put('/admin/class/:id',function(req,res){
    connection.query("UPDATE `class` set `className` = ? WHERE `id` = ?",[req.body.className,req.params.id],function(error,result){
        if(error) throw error;
        res.status(200).json({id:req.params.id,className:req.body.className,message:'class updated'});
    });
});

router.delete('/admin/class/:id',function(req,res){
    connection.query("DELETE FROM `class` WHERE `id` = ?",req.params.id,function(error,result){
        if(error) throw error;
        res.status(200).json({id:req.params.id,message:'class removed'});
    });
});

router.post('/admin/teacher',function(req,res){
    if(!req.body.name || req.body.name == ""){
        res.status(200).json({message:"Name is required"});
    }
    else if (!req.body.email_id || req.body.email_id == "") {
        res.status(200).json({ message: "Email id is required" });
    }
    else if (!req.body.password || req.body.password == "") {
        res.status(200).json({ message: "Password is required" });
    }
    else{
        connection.query("INSERT INTO `users` (name,email_id,password,role) VALUES (?,?,?,?)",[req.body.name,req.body.email_id,req.body.password,"teacher"],function(error,result){
            if(error) throw error;
            res.status(200).json({message:"teacher added",id:result.insertId});
        });
    }
});

router.get('/admin/teacher',function(req,res){
    connection.query("SELECT * FROM `users` WHERE `role` = ?","teacher",function(error,result){
        if(error) throw error;
        res.status(200).json({data:result});
    });
});

router.delete('/admin/teacher/:id',function(req,res){
    connection.query("DELETE FROM `users` WHERE `id` = ?",req.params.id,function(error,result){
        if(error) throw error;
        res.status(200).json({id:req.params.id,message:'teacher removed'});
    });
});

router.put('/admin/teacher/:teacherId/class/:classId',function(req,res){
    connection.query("UPDATE `users` set `class` = ? WHERE `id` = ?",[req.params.classId,req.params.teacherId],function(error,result){
        if(error) throw error;
        res.status(200).json({message:'teacher mapped to class'});
    });
});

router.post('/admin/student',function(req,res){
    if(!req.body.name || req.body.name == ""){
        res.status(200).json({message:"Name is required"});
    }
    else if (!req.body.email_id || req.body.email_id == "") {
        res.status(200).json({ message: "Email id is required" });
    }
    else if (!req.body.password || req.body.password == "") {
        res.status(200).json({ message: "Password is required" });
    }
    else{
        connection.query("INSERT INTO `users` (name,email_id,password,role) VALUES (?,?,?,?)",[req.body.name,req.body.email_id,req.body.password,"student"],function(error,result){
            if(error) throw error;
            res.status(200).json({message:"student added",id:result.insertId});
        });
    }
});

router.get('/admin/student',function(req,res){
    connection.query("SELECT * FROM `users` WHERE `role` = ?","student",function(error,result){
        if(error) throw error;
        res.status(200).json({data:result});
    });
});

router.delete('/admin/student/:id',function(req,res){
    connection.query("DELETE FROM `users` WHERE `id` = ?",req.params.id,function(error,result){
        if(error) throw error;
        res.status(200).json({id:req.params.id,message:'student removed'});
    });
});

router.put('/admin/student/:studentId/class/:classId',function(req,res){
    connection.query("UPDATE `users` set `class` = ? WHERE `id` = ?",[req.params.classId,req.params.studentId],function(error,result){
        if(error) throw error;
        res.status(200).json({message:'student mapped to class'});
    });
});

module.exports = router;