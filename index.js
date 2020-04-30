/*
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
*/

const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();
app.use(express.static(process.env.SERVE_DIRECTORY || 'dist'));
app.get('/', function(req, res) {
  return res.end('<p>This server serves up static files.</p>');
});

const options = {
  key: fs.readFileSync('key.pem', 'utf8'),
  cert: fs.readFileSync('cert.pem', 'utf8'),
  passphrase: process.env.HTTPS_PASSPHRASE || ''
};
const server = https.createServer(options, app);

server.listen(process.env.SERVER_PORT || 8443);
