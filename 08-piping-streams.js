import fs from 'fs'

const foobarStream = fs.createReadStream('./assets/foobarbaz.txt')

foobarStream.pipe(process.stdout)
