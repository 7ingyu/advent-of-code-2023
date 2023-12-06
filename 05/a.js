const input = require('./input')
const text = input.trim()
const [
  seeds_str,
  ...maps_str
] = text.split('\n\n')

const seeds = seeds_str.split(' ').slice(1).map(n => Number(n))

const maps = maps_str.map(
  str => str
    .split('\n')
    .slice(1)
    .map(nums => nums
      .split(' ')
      .map(n => Number(n))
    )
)

let lowest_loc = Infinity

for (let el of seeds) {
  for (let map of maps) {
    for (let [ dest, src, range ] of map) {
      if (el > src && el < src + range) {
        let diff = Math.abs(src - el)
        el = dest + diff
        break
      }
    }
  }
  if (el < lowest_loc) lowest_loc = el
}

console.log(lowest_loc)



