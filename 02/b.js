const input = require('./input')

const lines = input.split('\n').filter(ln => ln.length)

const multiply = (...args) => {
  let res = 1
  for (let num of args) res *= num
  return res
}

const sum = lines.reduce((acc, ln) => {
  // if (ln !== 'Game 3: 20 green, 1 blue, 7 red; 20 green, 7 blue; 18 red, 8 green, 3 blue; 7 red, 6 blue, 11 green; 11 red, 6 blue, 16 green') return
  let [ gameId, plays ] = ln.split(':')

  gameId = Number(gameId.replace('Game ', ''))
  plays = plays.split(/[,;]/).map(str => str.trim())

  // console.log(plays)

  const mins = {
    red: 0,
    green: 0,
    blue: 0
  }

  plays.forEach(str => {
    const [num, color] = str.split(' ')
    if (Number(num) > mins[color]) mins[color] = Number(num)
  })

  const power = multiply(...Object.values(mins))
  // console.log(mins, power)
  return acc + power
}, 0)

console.log(sum)