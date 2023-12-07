const fs = require('fs')
const hands = fs
  .readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n')
  .map(str => str.trim().split(/\s/))
  .map(([hand, bid]) => [hand, Number(bid.trim())])

const points = {
  "A": 13,
  "K": 12,
  "Q": 11,
  "T": 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
  "J": 0
}

const sum = hands
  .map(([hand, bid]) => {
    const worth = []
    const cards = {}
    for (const card of hand) {
      worth.push(points[card])
      if (!cards[card]) cards[card] = 0
      cards[card] ++
    }
    const j_count = cards['J'] || 0
    if (j_count) delete cards['J']
    const counts = Object.values(cards).toSorted((a, b) => b - a)
    if (!counts.length) {
      counts.push(j_count)
    } else {
      counts[0] += j_count
    }
    if (counts.includes(5)) {
      // 5 of any kind
      worth.unshift(6)
    } else if (counts.includes(4)) {
      // 4 of any kind
      worth.unshift(5)
    } else if (counts.includes(3) && counts.includes(2)) {
      // 3 of a kind and 2 of another
      worth.unshift(4)
    } else if (counts.includes(3) && counts.includes(1)) {
      // 3 of a kind and 2 singles
      worth.unshift(3)
    } else if (counts.indexOf(2) !== counts.lastIndexOf(2)
      && counts.indexOf(2) >= 0
      && counts.lastIndexOf(2) >= 0
    ) {
      // 2 pairs and a single
      worth.unshift(2)
    } else if (counts.indexOf(2) === counts.lastIndexOf(2)
      && counts.indexOf(2) >= 0
    ) {
      // 1 pair and 3 singles
      worth.unshift(1)
    } else {
      // all unique
      worth.unshift(0)
    }
    return [hand, bid, worth]
  })
  .toSorted(([a, b, worth_a], [c, d, worth_b]) => {
    for (let i = 0; i < worth_a.length; i++) {
      if (worth_a[i] !== worth_b[i]) return worth_a[i] - worth_b[i]
    }
  })
  .reduce((acc, [cards, bid], i) => acc + ((i + 1) * bid), 0)

// console.log(sum.slice(980, 1002))
console.log(sum)