import pathlib
import re
time, distance = [[int(x) if x.isdigit()
  else x for x in re.split(r'\s+', ln.strip())] for ln in open(
    str(pathlib.Path(__file__).parent.resolve()) + '/input.txt'
  ).readlines()]

product = 1

for i in range(1, len(time)):
  ms = time[i]
  record = distance[i]
  count = 0

  for hold in range(1, ms):
    traveled = hold * (ms - hold)
    if traveled > record:
      count += 1
    elif count > 0:
      break
  product *= count

print(product)