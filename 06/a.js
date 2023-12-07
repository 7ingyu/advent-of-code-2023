const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const [ time, distance ] = input
  .split('\n')
  .filter(ln => ln.length)
  .map(ln => ln
    .trim()
    .split(/\s+/)
    .map(str => isNaN(Number(str)) ? str : Number(str))
  )

let product = 1

for (let i = 1; i < time.length; i++) {
  const ms = time[i]
  const record = distance[i]
  let count = 0

  for (let hold = 1; hold < ms; hold ++) {
    const traveled = hold * (ms - hold)
    if (traveled > record) {
      count ++
    } else if (count > 0) {
      break
    }
  }
  product *= count
}

console.log(product)