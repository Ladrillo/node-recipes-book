import { watchFile } from 'fs'
import { writeFile } from 'fs/promises'
import { exec } from 'child_process'

process.setUncaughtExceptionCaptureCallback(evt => {
  console.error('Nasty uncaught exception:', evt)
})

console.log('watching for changes in package.json...\n')

watchFile('package.json', { interval: 1000 }, async (current, previous) => {
  console.log('package.json has changed!!\n')

  await writeFile('assets/old.json', `${JSON.stringify(previous)}\n`)
  await writeFile('assets/new.json', `${JSON.stringify(current)}\n`)

  const chidlProcess = exec('diff assets/old.json assets/new.json')
  chidlProcess.stdout.on('data', (data) => {
    console.log(data)
  })
  chidlProcess.stderr.on('data', (data) => {
    console.error(data)
  })
})
