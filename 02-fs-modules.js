import fs from 'fs/promises'

const url = new URL('./.gitignore', import.meta.url)

fs.writeFile(url, '.env\nnode_modules/\n.DS_Store\n.vscode')
  .then(() => {
    return fs.readFile(url)
  })
  .then(data => {
    // process.stdout.write(data)
  })

function writeConvertedCsv() {
  const nastyCsvUrl = new URL(
    './assets/nasty.csv',
    import.meta.url
  )
  const convertedCsvUrl = new URL(
    './assets/nasty-converted.csv',
    import.meta.url
  )

  fs.readFile(nastyCsvUrl)
    .then(data => {
      const lines = data
        .toString()
        .trim()
        .split('\n')
        .slice(2)
        .filter(line => line.slice(0, 8) !== '"Student')

      const shorterLines = []
      lines.forEach(line => {
        const split = line.split(',')
        const result = `${split[0]},${split[1]}, ${split[split.length - 1]}`
        shorterLines.push(result)
      })
      return fs.writeFile(convertedCsvUrl, shorterLines.join('\n'))
    })
    .then(() => {
      return fs.readFile(convertedCsvUrl)
    })
    .then((data) => {
      process.stdout.write(data.toString())
    })
}
writeConvertedCsv()
