var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var { expressjwt } = require("express-jwt");
var routes = require("./routes");
//var http = require('http');
var domain = require("domain");

var app = express();

app.set("port", process.env.PORT || 4000);

app.use("/static", express.static("static"));
app.use(
    expressjwt({
        secret: "secret12345", // 签名的密钥 或 PublicKey
        algorithms: ["HS256"],
        // requestProperty: 'auth',  // Authorization request.headers['Authorization'] = `Bearer ${user_token}`;
        credentialsRequired: true // false：不校验
    }).unless({
        path: ["/", "/login", "/signup"], // 指定路径不经过 Token 解析
    })
);
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token");
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 处理没有捕获的异常，导致 node 退出
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on("error", function (err) {
        res.status(err.status || 500);
        res.render("error");
    });
    reqDomain.run(next);
});

/*
app.use(express.static(__dirname, '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + 'uploads'));
*/

// 配置允许跨域
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

routes(app);

app.listen(4000);

console.log("Express server listening on port 4000");
