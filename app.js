var http = require("http");
var express = require("express");
const cors = require("cors");
var path = require("path");
// 引入 cookie 处理对象
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var { expressjwt } = require("express-jwt");
var WebSocket,
    { WebSocketServer } = require("ws");
var routes = require("./routes");
//var http = require('http');
var domain = require("domain");

var app = express();

app.set("port", process.env.PORT || 4000);

// view engine setup
app.engine("html", require("express-art-template"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(express.json()); // 解析JSON请求体
app.use(express.urlencoded({ extended: true })); // 解析URL编码请求体
app.use(cors());
// 定义使用 cookie 处理对象
app.use(cookieParser());

app.use("/static", express.static("static"));
app.use(
    expressjwt({
        secret: "secret12345", // 签名的密钥 或 PublicKey
        algorithms: ["HS256"],
        // requestProperty: 'token',  // Authorization request.headers['Authorization'] = `Bearer ${user_token}`;
        credentialsRequired: true, // false：不校验
        getToken: function fromHeaderOrQuerystring(req) {
            console.log("Authorization::", req.headers.authorization);
            if (
                req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer"
            ) {
                return req.headers.authorization.split(" ")[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        },
    }).unless({
        path: [
            "/",
            "/login",
            "/signup",
            "/ws",
            "/stream",
            "/stream/readFile",
            "/sse",
        ], // 指定路径不经过 Token 解析
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

// 匹配任意路径
// app.get("*", (req, res) => {
//     res.send("404 Not Found");
// });

routes(app);

// 创建WebSocket Server
var server = http.createServer(app);

var wss = new WebSocketServer({
    server,
    autoAcceptConnections: true, // 默认：false
});

wss.on("connection", function connection(ws) {
    console.log("server: receive connection.");

    ws.on("message", function incoming(message) {
        console.log("server: received: %s", message);
        ws.send(message + " zhao");
    });

    ws.send("world");
    // setInterval(() => {
    //     ws.ping('3333', false, () => {});
    // }, 3000)

    ws.on("pong", () => {
        console.log("server: received pong from client");
    });
});

module.exports = server;
