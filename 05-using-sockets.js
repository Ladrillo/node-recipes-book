import net from 'net'

const PORT = 9000
const HOSTNAME = 'localhost'
const isServer = process.argv[2] === 'server'
const isClient = process.argv[2] === 'client'

function server() {
  console.log('putting server together...')
  net.createServer(socket => {
    console.log('client connected!')
    socket.on('data', data => {
      console.log('responding...')
      socket.write(`Hello, my dear ${data}`)
    })
  }).listen(PORT, HOSTNAME)
}

function client() {
  console.log('putting client together...')
  const socket = net.connect(PORT, HOSTNAME)
  process.stdin.on('data', data => { // hitting server
    socket.write(data.toString())
  })
  socket.on('data', data => { // logging response
    console.log(data.toString())
  })
}

if (isServer) server()
else if (isClient) client()
else {
  console.log('pass either server or client argv')
  process.exit(1)
}
