var express = require("express");
var app = express();
const weasyPrint = require("weasyprint-wrapper");
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get('/home', (req, res, next) => {
    let stream = weasyPrint('http://google.com/', {
        pageSize: 'letter'
    });
    let bufferData = [];
    // do whatever with the stream
    stream.on('data', (chunk) => {
        bufferData.push(chunk);
    });
    stream.on('end', () => {
        let concatBuffer = Buffer.concat(bufferData);
        let base = concatBuffer.toString('base64');
        res.json({
            base64: base
        });
        next();
    });
    stream.on('error', (err) => {
        res.json({
            error: err
        });
        next(err);
    });
});