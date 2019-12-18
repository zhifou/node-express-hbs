/**
 * Created by zhaoyadong on 28/07/2014.
 */
var index = require('../controllers/index.js');

module.exports = function(app){

    app.get('/', index.home);
};