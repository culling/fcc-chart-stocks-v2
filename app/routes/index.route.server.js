const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

//var passport    = require("passport");

var http = require("http");
/*
router.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    var status = 202;
    res.status(status).end(http.STATUS_CODES[status]);
    //res.redirect('/');
});



router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});
*/


module.exports = router;
