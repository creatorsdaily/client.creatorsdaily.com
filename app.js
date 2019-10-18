const http2 = require('http2')
const fs = require('fs')
const proxy = require('http2-proxy')

const server = http2.createSecureServer({
  key: fs.readFileSync('127.0.0.1+1-key.pem'),
  cert: fs.readFileSync('127.0.0.1+1.pem')
})

server.listen(443)

server.on('request', (req, res) => {
  proxy.web(req, res, {
    hostname: 'localhost',
    port: 3000
  })
})
