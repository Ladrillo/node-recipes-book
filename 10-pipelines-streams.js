import fs from 'fs'
import { pipeline, Transform } from 'stream'

const rs = fs.createReadStream('./assets/foobarbaz.txt')
const ws = fs.createWriteStream('./assets/foobarbaz-new.txt')

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase())
  }
})

const farted = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString() + ' farted!')
  }
})

pipeline(rs, uppercase, farted, ws, err => {
  if (err) {
    console.error('dis failed miserably', err)
  } else {
    console.log('dis really worksed!')
  }
})
