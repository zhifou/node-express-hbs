var express = require('express');
var routes = require('./routes');
//var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var domain = require('domain');

var app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use('/static', express.static('static'));

hbs.registerPartials(__dirname + '/views/partials');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 处理没有捕获的异常，导致 node 退出
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) {
        res.status(err.status || 500);
        res.render('error');
    });
    reqDomain.run(next);
});

/*
app.use(express.static(__dirname, '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + 'uploads'));
*/

// 配置允许跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

routes(app);

app.listen(4000);
console.log('Express server listening on port 4000');
