const http2 = require('http2')
const fs = require('fs')
const proxy = require('http2-proxy')

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost+2-key.pem'),
  cert: fs.readFileSync('localhost+2.pem')
})

server.listen(443)

server.on('request', (req, res) => {
  proxy.web(req, res, {
    hostname: 'localhost',
    port: 3000
  })
})
