/**
 * Created by zhaoyadong on 12/11/2017.
 */
/**
 * Created by zhaoyadong on 26/03/2017.
 */

var builder = require('./builder/index');

var index = {

    home: function(req, res) {
        var val = {
            title: 'packjs工程'
        };
        var vm = builder.buildIndexPage(val);

        res.render('index', vm);
    }
};

module.exports = index;