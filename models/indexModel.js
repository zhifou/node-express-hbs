/**
 * Created by zhaoyadong on 25/03/2017.
 */
var augment = require('./augment');
var baseModel = require('./model');

var Index = function() {
    this.name = 'Tom';
};

augment(Index, baseModel);

module.exports = Index;