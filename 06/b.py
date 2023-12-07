import pathlib
import re
time, distance = [int(re.sub(r'\s', '', ln.strip().split(':')[1])) for ln in open(
    str(pathlib.Path(__file__).parent.resolve()) + '/input.txt'
  ).readlines()]

count = 0

left = 0
right = time - 1

def isWin (hold, limit = time, record = distance):
  traveled = hold * (limit - hold)
  return traveled > record

while isWin(left) is False: left += 1
while isWin(right) is False: right -= 1

print(right - left + 1)