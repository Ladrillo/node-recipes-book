import fs from 'fs'
import { Transform } from 'stream'

const rs = fs.createReadStream('./assets/foobarbaz.txt')
const ws = fs.createWriteStream('./assets/foobarbaz-new.txt')

const scream = new Transform({
  transform(chunk, encoding, callback) {
    console.log('chunk', chunk.toString())
    console.log('encoding', encoding)
    console.log('callback', callback)
    callback(null, chunk.toString().toUpperCase())
  }
})

rs
  .pipe(scream)
  .pipe(ws)
