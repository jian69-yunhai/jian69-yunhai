import random

# 生成10个1至100的随机整数
random_numbers = [random.randint(1, 100) for _ in range(10)]

# 打印结果
print("生成的10个随机数是：")
print(random_numbers)