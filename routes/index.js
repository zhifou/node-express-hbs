/**
 * Created by zhaoyadong on 28/07/2014.
 */
const index = require("../controllers/index.js");
const login = require("../controllers/login.js");
const puppe = require("../controllers/puppe.js");

module.exports = function (app) {
    app.get("/", index.home);
    app.post("/login", login.login);
    app.get("/api/puppe", puppe.puppe);

    // 使用restful风格定义api
    // 仅接收 get 请求
    // 匹配路径：'/name'
    // 不匹配路径：'/na'、'/name/123'、...
    app.get("/name", (req, res) => {});

    // 匹配路径：'/name/123'、'/name/ '、...
    // 不匹配路径：'/name/1/a'、'/name/'、...
    app.get("/name/:id", (req, res) => {
        // 获取请求的 url
        console.log(req.originalUrl);
        // 获取请求头
        console.log(req.headers);
        // 获取请求路径
        console.log(req.path);
        // 获取请求中匹配动态路径的参数组成的对象
        console.log(req.params);
        // 获取请求查询字符串的对象形式
        console.log(req.query);
    });

    // 仅接收 delete 请求
    // 匹配路径：'/name/person'
    // 不匹配路径：'/na'、'/name/123'、...
    app.delete("/name/person", (req, res) => {});

    // 接收所有方法的请求
    // 匹配路径：'/name'
    // 不匹配路径：'/na'、'/name/123'、...
    app.all("/name", (req, res) => {});

    // 匹配路径：'/te12st/name'、'/test/name'、...
    // 不匹配路径：'/test'、'/test5/name'、...
    app.all("/te**st/name", (req, res) => {});

    // 匹配任何路径
    app.all("*", (req, res) => {});
};
