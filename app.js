var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '/static')));

var urlencodedParser = bodyParser.urlencoded({ extended : false });

app.get('/', function(req, res){
    res.render('login', {css_style : 'login_style.css'});
});

app.get('/submit', function(req, res){
    res.render('login', {css_style : 'login_style.css'});
});

app.post('/submit', urlencodedParser, function(req, res){
    console.log(req.body);
    console.log(req.body.username)

    var ideal_username = 'username'; //extract from database
    var ideal_password = 'password'; //extract from database
    
    if(req.body.username === ideal_username)
    {
        if(req.body.password === ideal_password)
            res.render('login-success', {css_style : 'login_success.css', username : req.body.username});
        else
            res.render('login-fail', {css_style : 'login_fail.css', error_message : 'Invalid username / password'});
    }
    else if(req.body.username == '' || req.body.password == '')
        res.render('login-fail', {css_style : 'login_fail.css', error_message : 'Field cannot be empty!'});
    else
        res.render('login-fail', {css_style : 'login_fail.css', error_message : 'Invalid username / password'});
});

app.listen(app.get('port'), function(){
    console.log("Server started on port" + app.get('port'));
});