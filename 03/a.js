const input = require('./input')
const lines = input.split('\n').filter(ln => ln.length)

let sum = 0

const isSymbol = (char) => {
  if (!isNaN(char)) return false
  if (char === '.') return false
  return true
}

let lineNum = 0
console.log('line', lineNum)
while (lineNum < lines.length) {
  let n = ''
  let start = -1
  let end = 0
  let ln = lines[lineNum]
  // if (!lineNum) console.log(ln)
  // if (lineNum) return
  for (let i = 0 ; i < ln.length; i++) {
    const char = ln[i]
    // console.log(char)
    if (!isNaN(char)) {
      // console.log(char, 'is a number')
      // If is a number
      n += char
      if (start === -1) {
        start = i
      }
    } else {
      // console.log('end of number', n, 'start', start)
      // end of number
      if (start > -1) {
        // if number recorded, check for symbols around it
        end = i - 1
        const toCheck = [ln[start - 1], ln[end + 1]]
        for (let j = start - 1; j <= end + 1; j++) {
          if (lineNum - 1 >= 0) toCheck.push(lines[lineNum - 1][j])
          if (lineNum + 1 < lines.length) toCheck.push(lines[lineNum + 1][j])
        }
        console.log('line', lineNum, 'n', n, toCheck)
        let not_found = toCheck.every((el) => !isSymbol(el))
        if (!not_found) {
          console.log('line', lineNum, Number(n))
          sum += Number(n)
        }
      }
      // reset for next number
      start = -1
      end = 0
      n = ''
    }
  }

  lineNum ++
}


console.log(sum)