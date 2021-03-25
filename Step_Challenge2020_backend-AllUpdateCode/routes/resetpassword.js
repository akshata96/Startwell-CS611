const express = require('express');
const mysql = require("mysql");
const app = express();
var bcrypt = require("bcrypt")
var bodyParser = require('body-parser');
var path = require('path');
var mailer = require("nodemailer");
var Crypto = require('crypto')
var moment = require('moment')
var router = express.Router();


var pool = mysql.createPool({
    host:'stark.cse.buffalo.edu',
    port:3306,
    user:'steps_user',
    database:'step_db',
    password:'ChangeMe!'
})


router.get('/', function(req,res){
    console.log(req.query)
    var data = {
        "token" : req.query.resetPasswordToken,
    }
    console.log(data.token)
    pool.query("SELECT * from User_Table where resetPasswordToken = ?",
    data.token,function(error,results,fields){
        var d = new Date()
        console.log(results)
        console.log(d - results[0].resetPasswordTokenExpires)
        if(error){
            res.send({
                "code":400,
                "Status":"error occured"
            })
        }
        else if(d - results[0].resetPasswordTokenExpires <= 3600000){
            res.send({
                "code" : 200,
                "Status":"reset link OK",
                results
            })
        }
        else{
            res.send({
                "code" : 210,
                "Status" : "reset link expired"
            })
        }
    })

})

module.exports = router;