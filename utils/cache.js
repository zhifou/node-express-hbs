/**
 * 是否使用浏览器缓存
 * @param req
 * @param res
 * @param statObj
 * @return {boolean}
 */
var cache = function(req, res, statObj) {
    // etag if-none-match
    // Last-Modified if-modified-since
    // Cache-Control
    // ifNoneMatch一般是内容的md5戳 => ctime + size
    var ifNoneMatch = req.headers['if-none-match'];

    //ifModifiedSince文件的最新修改时间
    var ifModifiedSince = req.headers['if-modified-since'];
    //最新修改时间
    var since = statObj.ctime.toUTCString();

    //代表的是服务器文件的一个描述
    var etag = new Date(since).getTime()  +'-'+statObj.size;
    res.setHeader('Cache-Control','max-age=10');

    //10秒之内强制缓存
    res.setHeader('Etag',etag);
    //请求头带着
    res.setHeader('Last-Modified',since);

    //再访问的时候对比，如果相等，就走缓存
    if(ifNoneMatch !== etag){
        return false;
    }

    if(ifModifiedSince != since){
        return false;
    }

    res.statusCode = 304;
    res.end();
    return true;
}