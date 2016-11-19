
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('sqldb');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.all('/',function (req,res) {
    console.log(req.method)
    console.log(req.body)
    if(req.method==='POST'){
        var str_arr=[]
        if(req.body.cate!==''){str_arr.push("cate='"+req.body.cate+"'")}
        if(req.body.area!==''){str_arr.push("area='"+req.body.area+"'")}
        if(req.body.pubdate!==''){str_arr.push("pubdate='"+req.body.pubdate+"'")}
        if(str_arr.length==0){
              var substr=""
        }
        else if(str_arr.length==1){
            var substr=" where "+str_arr[0]
        }
        else if(str_arr.length==2){
            var substr=" where "+str_arr[0]+" and "+str_arr[1]
        }
        else{
            var substr=" where "+str_arr[0]+" and "+str_arr[1]+" and "+str_arr[2]

        console.log(substr)}
    }
    else{
        var substr=""
    }
    var countsum_by_date="SELECT pubdate,sum(count)as count FROM saleslist"+substr+" group by pubdate order by pubdate"
    var pricesum_by_name="SELECT name,sum(price) as price FROM saleslist"+substr+" group by name"
    var pricesum_by_area="SELECT area,sum(price) as price FROM saleslist"+substr+" group by area order by price desc"
    var pricesum_by_cate="SELECT cate,sum(price) as price FROM saleslist"+substr+" group by cate order by price desc"
    db.all(countsum_by_date,function (err,rows1) {
        db.all(pricesum_by_name,function (err,rows2) {
            db.all(pricesum_by_area,function (err,rows3) {
                db.all(pricesum_by_cate,function (err,rows4) {
                    res.render('chart.html',{
                        countsum_by_date:rows1,
                        pricesum_by_name:rows2,
                        pricesum_by_area:rows3,
                        pricesum_by_cate:rows4
                    })
                })
            })
        })
    })


})

module.exports = router;