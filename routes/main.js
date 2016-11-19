
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('sqldb');
db.all("select * from saleslist",function (err,rows) {
    router.get('/list',function (req,res) {
        res.render('list.html',{datas:rows
        })
    })
})

/* GET users listing. */
router.get('/base',function (req,res) {
    res.render('base.html')
})
router.get('/link',function (req,res) {
    res.render('link.html')
})
router.get('/buildlog',function (req,res) {
    res.render('buildlog.html')
})






module.exports = router;