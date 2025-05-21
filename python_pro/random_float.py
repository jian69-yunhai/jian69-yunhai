import random

# 生成10个1到100之间的随机浮点数
random_numbers = [random.uniform(1, 100) for _ in range(10)]

# 打印每个随机数，保留4位小数
for i, number in enumerate(random_numbers, 1):
    print(f"第{i}个随机数: {number:.4f}")
