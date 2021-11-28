import fs from 'fs/promises'

async function getMetadata() {
  try {
    const file = process.argv[2]
    const metadata = await fs.stat(file)
    process.stdout.write(JSON.stringify(metadata))
  } catch {
    process.stderr.write(`provide a file`)
  }
}
getMetadata()
