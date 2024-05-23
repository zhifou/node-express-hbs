/**
 * Created by zhaoyadong on 12/11/2017.
 */
var index = {
    home: function(req, res, next) {
        // res.send('hello express');
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        res.render('index', {title: 'Hello', content: 'World'});
        next();
    }
};

module.exports = index;