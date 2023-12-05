const input = require('./input')
const lines = input.split('\n').filter(ln => ln.length)

let num_cards = lines.length
const cache = {}

const getCardData = (line) => {
  const [label, numbers] = line.split(':')
  const card_num = Number(label.replace(/\D/gi, ''))
  if (cache[card_num]) return cache[card_num]
  const [winning_nums, scratch_nums] = numbers
    .split('|')
    .map((str) => str.split(/\s+/).filter(n => n.length))
  const matches = []
  for (let n of winning_nums) {
    const found = scratch_nums.includes(n)
    if (found) matches.push(n)
  }
  // console.log(matches)
  // console.log(matches)
  // console.log(`${card_num}: ${matches?.length || 0} matches ${JSON.stringify(matches)}`)
  cache[card_num] = { line, card_num, winning_nums, scratch_nums, matches }
  return cache[card_num]
}

lines.forEach(getCardData)

const getCopies = (card_num) => {
  const { matches } = cache[card_num]
  num_cards += matches.length
  for (let i = 0; i < matches.length; i++) {
    getCopies(card_num + 1 + i)
  }
}

for (let i = 0; i < lines.length; i++) {
  getCopies(i + 1)
}

console.log(num_cards)