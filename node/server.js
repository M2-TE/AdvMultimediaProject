const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

// get root directory
const rootDir = `${__dirname}/..`;

// read cli args
const args = process.argv.slice(2);
const port = args[0] == null ? 8000 : args[0];
const baseDirectory = args[1] == null ? dist : args[1];

// get ssl certificate and key
const options = {
    key: fs.readFileSync(`${rootDir}/ssl/key.pem`),
    cert: fs.readFileSync(`${rootDir}/ssl/cert.pem`)
};

https.createServer(options, function (request, response) {
    try {
        // get more accurate url info
        const urlInfo = new URL(request.url, `http://${request.headers.host}`);

        // reroute to index.html on '/' route
        const urlPath = urlInfo.pathname == '/'
            ? '/index.html'
            : urlInfo.pathname;

        const requestUrl = url.parse(urlPath);
        const fsPath = baseDirectory + path.normalize(requestUrl.pathname);

        const fileStream = fs.createReadStream(fsPath);
        fileStream.pipe(response);
        fileStream.on('open', function () {
            response.writeHead(200);
        })
        fileStream.on('error', function (e) {
            response.writeHead(404);
            response.end();
        })
    } catch (e) {
        // end on server-side error
        response.writeHead(500);
        response.end();
        console.log(e.stack);
    }
}).listen(port);

console.log("listening on port " + port);