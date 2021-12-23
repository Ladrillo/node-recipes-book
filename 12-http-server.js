import http from 'http'

const PORT = process.env.PORT || 9000
const HOSTNAME = process.env.HOSTNAME || '0.0.0.0'

const server = http.createServer((req, res) => {
  try {
    if (req.method !== 'GET') return bad(res, 405)
    if (req.url === '/todos') return todos(res)
    if (req.url === '/') return index(res)
    return bad(res, 404)
  } catch (err) {
    return error(err, res, 500)
  }
})
server.listen(PORT, HOSTNAME, () => {
  console.log(`Listening on ${server.address().port}`)
})

function bad(res, code) {
  res.statusCode = code
  res.end(`Error: ${http.STATUS_CODES[code]}`)
}
function todos(res) {
  res.statusCode = 200
  res.end(JSON.stringify([{ id: 1, todo: 'dishes' }]))
}
function index(res) {
  res.statusCode = 200
  res.end(`Todos server is up`)
}
function error(err, res, code) {
  res.statusCode = code
  res.end(`${http.STATUS_CODES[code]}: ${err.message}`)
}
