import fs from 'fs'
import { exec } from 'child_process'

process.setUncaughtExceptionCaptureCallback(evt => {
  console.error('Nasty uncaught exception:', evt)
})

console.log('watching for changes in package.json...\n')

fs.watchFile('package.json', { interval: 1000 }, (current, previous) => {
  console.log('package.json has changed!!\n')

  fs.writeFileSync('assets/old.json', `${JSON.stringify(previous)}\n`)
  fs.writeFileSync('assets/new.json', `${JSON.stringify(current)}\n`)

  const chidlProcess = exec('diff assets/old.json assets/new.json')
  chidlProcess.stdout.on('data', (data) => {
    console.log(data)
  })
  chidlProcess.stderr.on('data', (data) => {
    console.error(data)
  })
})
