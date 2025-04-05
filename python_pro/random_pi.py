#coding:utf-8

import random
import math

n = random.randint(1,10)
if n > math.pi:
    perimeter = n * math.pi
    area = math.pi * (n / 2) ** 2
else:
    perimeter = 2 * n * math.pi
    area = math.pi * pow(n,2)

print("random n is: ", n)
print("Perimeter is: ",round(perimeter ,2))
print("Area is: ",round(area, 2))

