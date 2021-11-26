import fs from 'fs/promises'

const url = new URL('./.gitignore', import.meta.url)

fs.writeFile(url, '.env\nnode_modules/\n.DS_Store\n.vscode')
  .then(() => {
    return fs.readFile(url)
  })
  .then(data => {
    process.stdout.write(data)
  })
