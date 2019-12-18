/**
 * Created by zhaoyadong on 12/11/2017.
 */

var Model = require('../../models/indexModel');
var pageConfig = require('./pageConfig');

module.exports = {

    buildIndexPage: function (data) {
        var result = new Model();
        result.content = data;

        var basePage = pageConfig["index"] || {};
        result.page = basePage.page || {};
        return result;
    }
};