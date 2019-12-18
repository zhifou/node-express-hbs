var zlib = require('zlib');

var compress = function(req,res,statObj){
    // 压缩 Accept-Encoding: gzip,deflate,br
    // Content-Encoding:gzip
    var header = req.headers['accept-encoding'];
    if(header){

        if(header.match(/\bgzip\b/)){
            res.setHeader('Content-Encoding','gzip');
            return zlib.createGzip();
        }else if(header.match(/\bdeflate\b/)){
            res.setHeader('Content-Encoding','deflate');
            return zlib.createDeflate();
        }else{
            return false; //不支持压缩
        }
    }else{
        return false;
    }

};