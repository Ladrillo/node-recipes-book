import http from 'http'

const HOSTNAME = '0.0.0.0'
const PORT = 9000

const server = (req, res) => {
  let formData = ''

  req.on('data', chunk => {
    console.log('getting data...')
    formData += chunk.toString()
  })
  req.on('end', () => {
    console.log(formData)
    res.statusCode = 200
    res.end(`<h1>you got it!</h1>`)
  })
}

http.createServer(server)
  .listen(PORT, HOSTNAME, () => {
    console.log(`started on ${PORT}`)
  })
