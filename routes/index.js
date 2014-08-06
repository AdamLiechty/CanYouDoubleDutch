var Mailgun = require("mailgun").Mailgun;
var key = process.env.KEY;
var email = process.env.EMAIL;
var mg = new Mailgun(key);

/* GET home page. */
exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.indexPost = function (req, res) {
    mg.sendText(
        "DoubleDutch Challenge <" + email + ">",
        [email],
        "[DDChallenge][CanYouDD] " + req.body.email,
        req.body.solution);
    res.send("Woot!");
};