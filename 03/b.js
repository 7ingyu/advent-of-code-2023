const input = require('./input')
const lines = input.split('\n').filter(ln => ln.length)

let sum = 0

const isSymbol = (char) => {
  if (!isNaN(char)) return false
  if (char === '.') return false
  if (char === undefined) return false
  return true
}

const getProduct = (line_num, idx) => {
  const to_check = []
  if (lines[line_num][idx - 1].match(/\d/)) {
    to_check.push([line_num, idx - 1, lines[line_num][idx - 1]])
  }
  if (line_num, idx + 1, lines[line_num][idx + 1].match(/\d/)) {
    to_check.push([line_num, idx + 1, lines[line_num][idx + 1]])
  }
  if (line_num - 1 >= 0) {
    found = false
    for (let i = idx - 1; i <= idx + 1; i++) {
      if (!found && lines[line_num - 1][i].match(/\d/)) {
        to_check.push([line_num - 1, i, lines[line_num - 1][i]])
        found = true
      } else if (found && !lines[line_num - 1][i].match(/\d/)) {
        found = false
      }
    }
  }
  if (line_num + 1 < lines.length) {
    found = false
    for (let i = idx - 1; i <= idx + 1; i++) {
      if (!found && lines[line_num + 1][i].match(/\d/)) {
        to_check.push([line_num + 1, i, lines[line_num + 1][i]])
        found = true
      } else if (found && !lines[line_num + 1][i].match(/\d/)) {
        found = false
      }
    }
  }
  if (to_check.length === 2) {
    const [a, b] = to_check.map(getNumbers)
    return Number(a) * Number(b)
  } else {
    console.log('line', line_num + 2, '* at', idx, 'invalid:', to_check)
  }
  return 0
}

const getNumbers = ([ line_num, idx, n ]) => {
  left = idx - 1
  right = idx + 1
  while (left >= 0 && lines[line_num][left].match(/\d/)) {
    n = lines[line_num][left] + n
    left --
  }
  while (right < lines[line_num].length && lines[line_num][right].match(/\d/)) {
    n += lines[line_num][right]
    right ++
  }
  // console.log('line', line_num + 2, '-', n)
  return n
}

for (let line_num = 0; line_num < lines.length; line_num++) {
  for (let i = 0; i < lines[line_num].length; i++) {
    let char = lines[line_num][i]
    if (char === '*') {
      sum += getProduct(line_num, i)
    }
  }
}

console.log(sum)