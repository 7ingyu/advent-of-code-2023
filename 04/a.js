const input = require('./input')
const lines = input.split('\n').filter(ln => ln.length)

const getCardPoints = (line) => {
  let points = 0

  const [label, numbers] = line.split(':')
  const [winning_nums, card_nums] = numbers
    .split('|')
    .map((str) => str.split(/\s+/).filter(n => n.length))
  console.log('winning_nums:', winning_nums)
  for (let n of winning_nums) {
    const found = card_nums.includes(n)
    // console.log(matches)
    if (found) {
      // for (let i = 0; i < matches.length; i++) {
        if (!points) {
          points = 1
        } else {
          points *= 2
        }
      // }
    }
  }
  console.log(points)
  return points
}

// getCardPoints(lines[3])

const sum = lines.reduce((acc, ln) => {
  return acc + getCardPoints(ln)
}, 0)

console.log(sum)