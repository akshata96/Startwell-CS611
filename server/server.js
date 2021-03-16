var db = require('./db');
const express = require('express')

var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const port = 3200

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/user/login', (req, res) => {
    db.conn.query(`SELECT * FROM users where EmailID='${req.body.email}' and Pass='${req.body.pass}'`, function (err, queryResponse) {
        if (err) {
            res.send(err.code)} else {
                res.send(queryResponse)
            };
        });
})

app.post('/user/signup', (req, res) => {
    var obj = req.body;
    if(obj.dob && obj.email && obj.firstname && obj.lastname && obj.pass && obj.username && obj.usertype){
    db.conn.query(`INSERT INTO users 
    (DOB, EmailID, First_Name, Last_Name, Pass, UserID, UserType) VALUES 
    ('${obj.dob}','${obj.email}','${obj.firstname}','${obj.lastname}','${obj.pass}','${obj.username}','${obj.usertype}' );`, function (err, queryResponse) {
        if (err) { res.send(err.code);} else {
        res.send({user : obj.firstname + ' ' + obj.lastname})
        }});
    } else {
        res.send('Missing Parameters!')
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


