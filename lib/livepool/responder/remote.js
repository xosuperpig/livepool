var http = require('http'),
    url = require('url'),
    Buffer = require('buffer').Buffer,
    logger = require('../logger');

function remoteResponder(handler, req, res, options) {
    //var reqUrl = url.parse(handler.action);
    //֧����action����$1,$2��ȡ����ƥ����
    //���� http://nodejs.org/dist/(.*) => http://npm.taobao.org/mirrors/node/$1
    var reqUrl = url.parse(req.url.replace(new RegExp(handler.matchResolve), handler.action));
    var buffers = [];
    var options = {
        hostname: reqUrl.hostname,
        port: 80,
        path: reqUrl.pathname,
        method: 'GET'
    };

    var request = http.request(options, function(response) {
        response.pipe(res);
    });

    request.on('error', function(e) {
        logger.log('problem with request: ' + e.message);
    });

    request.end();
}

module.exports = remoteResponder;
