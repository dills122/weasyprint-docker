var express = require("express");
var app = express();
const weasyPrint = require("weasyprint-wrapper");

app.listen(8080, () => {
    console.log("Server running on port 3000");
});

app.get('/convert/stream', (req, res, next) => {
    let inputStr = req.body.inputStr;
    // let inputStr = "http://www.google.com";
    let stream = weasyPrint(inputStr, {
        pageSize: 'letter'
    });
    res.setHeader("content-type", "application/pdf");
    res.attachment('pdfname.pdf');
    stream.pipe(res);
});

app.get('/convert/base64', (req, res, next) => {
    let inputStr = req.body.inputStr;
    // let inputStr = "http://www.google.com";
    let stream = weasyPrint(inputStr, {
        pageSize: 'letter'
    });
    // Base64
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