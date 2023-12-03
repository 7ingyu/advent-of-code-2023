const input = require('./input')

const lines = input.split('\n').filter(ln => ln.length)
const sum = lines.reduce((acc, ln) => {
  const nums = ln.replace(/\D/g, '')
  const n = Number(nums[0] + nums[nums.length - 1])
  return acc + n
}, 0)

console.log(sum)