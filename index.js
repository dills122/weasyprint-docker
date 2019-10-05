const express = require('express');
const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;
const bodyParser = require('body-parser')
const weasyPrint = require("weasyprint-wrapper");

app.use(bodyParser.json({
    limit: '2mb'
}));

app.listen(port);

app.get('/convert/stream', (req, res, next) => {
    let inputStr = req.body.inputStr || false;
    if (!inputStr) {
        return res.sendStatus(400).json({
            error: "Missing inputStr"
        });
    }
    let stream = weasyPrint(inputStr, {
        pageSize: 'letter'
    });
    res.setHeader("content-type", "application/pdf");
    res.attachment('pdfname.pdf');
    stream.pipe(res);
});

app.get('/convert/base64', (req, res, next) => {
    let inputStr = req.body.inputStr || false;
    if (!inputStr) {
        return res.sendStatus(400).json({
            error: "Missing inputStr"
        });
    }
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