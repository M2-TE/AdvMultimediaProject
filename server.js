const https = require('https');
const url = require('url');
const fs = require('fs');
var path = require('path')
var baseDirectory = __dirname   // or whatever base directory you want

var port = 8000

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (request, response) {
    try {
        const newUrl = new URL(request.url, `http://${request.headers.host}`);
        console.log(request.url);
        console.log(newUrl);

        let actualUrl = newUrl.pathname;
        if (newUrl.pathname == '/') {
            actualUrl = '/index.html';
        }

        var requestUrl = url.parse(actualUrl)

        // TODOD: change vars

        // need to use path.normalize so people can't access directories underneath baseDirectory
        var fsPath = baseDirectory + path.normalize(requestUrl.pathname)

        var fileStream = fs.createReadStream(fsPath)
        fileStream.pipe(response)
        fileStream.on('open', function () {
            response.writeHead(200)
        })
        fileStream.on('error', function (e) {
            response.writeHead(404)     // assume the file doesn't exist
            response.end()
        })
    } catch (e) {
        response.writeHead(500)
        response.end()     // end the response so browsers don't hang
        console.log(e.stack)
    }
}).listen(port)

console.log("listening on port " + port)