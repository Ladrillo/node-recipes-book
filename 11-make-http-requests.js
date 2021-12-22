import http from 'http'

const opts = {
  method: 'POST',
  hostname: 'postman-echo.com',
  path: '/post',
  port: 80,
  headers: { 'Content-Type': 'application/json' }
}

const handler = response => {
  let str = ''
  response
    .on('data', chunk => {
      console.log('you see me')
      str += chunk
    })
    .on('end', res => {
      process.stdout.write(str)
    })
}

const errHandler = err => {
  process.stderr.write('WHAT!! -->', err)
}

const request = http.request(opts, handler)
  .on('error', errHandler)
  .end('lady gaga')
