# 获取用户输入的正整数
n = int(input("请输入一个正整数: "))

# 遍历从 1 到 n 的所有数
for i in range(1, n + 1):
    # 检查 i 是否为 n 的因子
    if n % i == 0:
        print(i," ",end="")
        
        
