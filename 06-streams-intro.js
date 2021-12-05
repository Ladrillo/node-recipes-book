import fs from 'fs'

const pathToFile = './assets/da-writable-stream.txt'
const dummyText = "Node.js is a JavaScript runtime built on Chrome's V8 engine.\n"

if (fs.existsSync(pathToFile)) {
  // the good stuff
  console.log('file exists, let\'s get on with streams...')
  const readStream = fs.createReadStream(pathToFile)
  readStream.on('data', data => {
    console.log('Read chunk:', data.toString())
  })
  readStream.on('end', () => {
    console.log('No more data.')
  })
} else {
  // prep
  console.log('file does not exist, let\'s create it...')
  const file = fs.createWriteStream(pathToFile)
  for (let i = 0; i < 100000; i++) {
    file.write(dummyText)
  }
}
