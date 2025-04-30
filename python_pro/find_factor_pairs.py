def find_factor_pairs(n, m):
    """
    在1至n中找出两个不同的数，使其和是m的因子
    
    Args:
        n: 范围上限
        m: 目标数
    
    Returns:
        list: 符合条件的数对列表
    """
    result = []
    # 遍历所有可能的数对
    for i in range(1, n + 1):
        for j in range(i + 1, n + 1):  # j从i+1开始，避免重复和相同的数
            # 检查和是否为m的因子
            if m % (i + j) == 0:
                result.append((i, j))
    return result

def main():
    # 获取用户输入
    try:
        n = int(input("请输入n（范围上限）: "))
        m = int(input("请输入m（目标数）: "))
        
        if n <= 0 or m <= 0:
            print("请输入正整数！")
            return
            
        # 查找符合条件的数对
        pairs = find_factor_pairs(n, m)
        
        # 输出结果
        print(f"\n在1至{n}中，和为{m}的因子的数对有：")
        if not pairs:
            print("没有找到符合条件的数对")
        else:
            print(f"共找到 {len(pairs)} 种组合：")
            for i, (a, b) in enumerate(pairs, 1):
                print(f"组合{i}: ({a}, {b}), 和为{a+b}, {m}/{a+b}={m//(a+b)}")
                
    except ValueError:
        print("请输入有效的整数！")

if __name__ == "__main__":
    main()