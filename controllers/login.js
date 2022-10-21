/**
 * Created by zhaoyadong on 12/11/2017.
 */
const jwt = require("jsonwebtoken");
const { User, Role } = require('./session');

var login = {
    login: function (req, res) {
        console.log(res.session);
        res.session = res.session || {};
        const user = res.session.user || {
            id: '2122',
            name: 'zhaoydong',
            role: Role.admin,
        };

        // 注意默认情况 Token 必须以 Bearer+空格 开头
        const token =
            "Bearer " +
            jwt.sign(
                {
                    id: user.id,
                    admin: user.role === "admin",
                },
                "secret12345",
                {
                    expiresIn: 3600 * 24 * 3,
                }
            );
        res.json({
            status: "ok",
            data: { token: token },
        });
    },
};

module.exports = login;
