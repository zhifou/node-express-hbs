/**
 * Created by zhaoyadong on 12/11/2017.
 */
 var user = {
    list: function(req, res, next) {
        console.log('user::list', req);
        // res.send(['zhifou', 'adam']);
        res.json({
            name: 'zhifou',
            age: 18,
        });
    }
};

module.exports = user;