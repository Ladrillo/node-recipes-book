import { stdin, stdout } from 'process'

const weapons = ['rock', 'paper', 'scissors']
const [R, P, S] = weapons

stdin.on('data', data => {
  data.player = data.toString().trim().toLowerCase()
  data.computer = weapons[Math.floor(Math.random() * 3)]
})

stdin.on('data', data => {
  const { computer, player } = data
  if (!weapons.includes(player)) {
    return stdout.write('That is an illegal weapon.\n\n')
  }
  let result
  if (computer === player) {
    result = 'It is a tie.'
  } else if (
    (player === R && computer === S) ||
    (player === P && computer === R) ||
    (player === S && computer === P)
  ) {
    result = `YOU WIN!`
  } else {
    result = `You lose.`
  }
  stdout.write(`You chose ${player}, computer chose ${computer}. ${result}\n\n`)
})
