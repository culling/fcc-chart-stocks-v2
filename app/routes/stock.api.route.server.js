const url           = require("url");
const querystring   = require('querystring');

var http            = require("http");

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

//Controllers
//var userController  = require("./../controllers/user.controller.server.js");
var stocksController    = require("./../controllers/stock.controller.server.js");


function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}




router.get("/:id", function(req, res){
    stocksController.lookup(req.params.id, function(found){
        res.write( JSON.stringify(found,null,"\t") );
        res.end();
    });
})

router.post("/", function(req, res){
    var sentStocks = req.body.stocks;

    sentStocks.map((stock)=>{
        stocksController.update(stock, function(response){

        });
    });

    res.end();
})

router.get("/", function(req, res){
    stocksController.findAll(function(err, found){
        if(err){
            res.write("Error Found - getting stocks");
            res.end();
            return;
        }

        res.write( JSON.stringify(found,null,"\t") );
        res.end();

    });

})



module.exports = router;