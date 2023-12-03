const input = require('./input')

const limits = {
  red: 12,
  green: 13,
  blue: 14
}

const lines = input.split('\n').filter(ln => ln.length)

const sum = lines.reduce((acc, ln) => {
  // if (ln !== 'Game 3: 20 green, 1 blue, 7 red; 20 green, 7 blue; 18 red, 8 green, 3 blue; 7 red, 6 blue, 11 green; 11 red, 6 blue, 16 green') return
  let [ gameId, plays ] = ln.split(':')

  gameId = Number(gameId.replace('Game ', ''))
  plays = plays.split(';').map(grab => grab.split(',').map(str => str.trim()))

  let valid = true
  for (let grab of plays) {
    for (let str of grab) {
      let num = Number(str.replace(/\D/g, ''))
      let color = str.replace(/[\d\s]/g, '')
      if (num > limits[color]) {
        valid = false
        break
      }
    }
    if (!valid) {
      break
    }
  }

  return valid ? acc + gameId : acc
}, 0)

console.log(sum)