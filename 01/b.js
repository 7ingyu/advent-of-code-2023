const input = require('./input')

const nums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

const lines = input.split("\n").filter((ln) => ln.length);
// console.log(lines.findIndex(el => el === 'qoneight55five3'))
// console.log(lines.length)
let count = -1;
const sum = lines.reduce((acc, ln) => {
  count++;
  let str = ln;
  const strings = ln.split(/\d/);
  if (strings[0]) {
    let first_found = Infinity;
    let found_num = -1;
    for (let i = 1; i < 10; i++) {
      let idxOf = strings[0].indexOf(nums[i]);
      if (idxOf >= 0 && idxOf < first_found) {
        first_found = idxOf;
        found_num = i;
      }
    }
    if (found_num > 0) str = str.replace(nums[found_num], found_num);
  }
  if (strings[strings.length - 1]) {
    let last_found = -1;
    let found_num = -1;
    for (let i = 1; i < 10; i++) {
      let idxOf = strings[strings.length - 1].lastIndexOf(nums[i]);
      if (idxOf > last_found) {
        last_found = idxOf;
        found_num = i;
      }
    }
    if (found_num > 0) str = str.replaceAll(nums[found_num], found_num);
  }
  str = str.replace(/\D/g, "");
  const n = Number(str[0] + str[str.length - 1]);
  // if (count === 90) console.log(ln, strings, str);
  return acc + n;
}, 0);

console.log(sum);
