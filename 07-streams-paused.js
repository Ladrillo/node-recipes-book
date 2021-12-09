import fs from 'fs'

const ws = fs.createWriteStream('./assets/foobarbaz.txt')
ws.write('foo\nbar\nbaz\n', () => {
  const rs = fs.createReadStream('./assets/foobarbaz.txt')
  const chunks = []
  console.log('is paused? 1', rs.isPaused())

  rs.on('readable', () => {
    console.log('is paused? 2', rs.isPaused())
    let chunk = rs.read()
    while (chunk !== null) {
      console.log('pushing chunk', chunk.toString())
      chunks.push(chunk)
      chunk = rs.read()
    }
  })
  rs.on('end', () => {
    console.log('is paused? 3', rs.isPaused())
    console.log('dat is da end. Chunks:', chunks.map(toString))
  })
})
