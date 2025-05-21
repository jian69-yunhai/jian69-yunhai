import random

# 生成10个1至100之间的随机整数
print("生成的10个随机数是:")
for i in range(10):
    random_number = random.randint(1, 100)
    print(f"第{i+1}个数: {random_number}")