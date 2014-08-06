var Mailgun = require("mailgun").Mailgun;
var mg = new Mailgun("KEY");

/* GET home page. */
exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.indexPost = function (req, res) {
    mg.sendText(
        "DoubleDutch Challenge <EMAIL>",
        ["EMAIL"],
        "[DDChallenge][CanYouDD] " + req.body.email,
        req.body.solution);
    res.send("Woot!");
};