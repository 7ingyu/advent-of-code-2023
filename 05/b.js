const input = require('./input')
const text = input.trim()
const [
  seeds_str,
  ...maps_strs
] = text.split('\n\n')

const numbers = seeds_str
  .split(' ')
  .slice(1)
  .map(n => Number(n))

const seeds = []
for (let i = 0; i < numbers.length; i += 2) {
  seeds.push([numbers[i], numbers[i + 1]])
}

const maps = maps_strs.map(
  str => str
    .split('\n')
    .slice(1)
    .map(nums => nums
      .split(' ')
      .map(n => Number(n))
    )
    .sort((a, b) => a[0] - b[0])
)

let lowest_loc = Infinity
let count = 0
for (let [ start, range ] of seeds) {
  console.log('on seed range', count, 'of', seeds.length)
  count ++
  for (let i = start; i < start + range; i++) {
    // console.log('checking seed', i)
    let el = i
    for (let m = 0; m < maps.length; m ++) {
      let map = maps[m]
      for (let [ dest, src, rng ] of map) {
        if (el >= src && el <= src + rng) {
          // console.log(`src ${el} in map ${m + 1} of ${maps.length}: ${JSON.stringify([ dest, src, rng ])}`)
          let diff = Math.abs(el - src)
          el = dest + diff
          // if (!m) {
          //   i += src + rng - i
          //   console.log(i)
          // }
          break
        }
      }
    }
    if (el < lowest_loc) lowest_loc = el
  }
}

console.log(lowest_loc)