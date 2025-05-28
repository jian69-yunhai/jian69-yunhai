import matplotlib.pyplot as plt

def drawRadar(ax):
    pi = 3.141592653589793
    # 使用英文标签
    labels = ['EQ', 'IQ', 'Destiny', 'Charm', 'Wealth', 'Power']
    attrNum = len(labels)
    data = [7, 6, 8, 9, 8, 2]
    angles = [2*pi*i/attrNum for i in range(attrNum)]
    angles2 = [x* 180/pi for x in angles]
    
    # 设置数值范围
    ax.set_ylim(0, 10)
    # 设置角度标签
    ax.set_thetagrids(angles2, labels)
    # 填充雷达图
    ax.fill(angles, data, facecolor='g', alpha=0.25)
    # 添加标题
    plt.title('Ability Radar Chart')

# 创建极坐标图，设置图形大小
ax = plt.figure(figsize=(8, 8)).add_subplot(projection='polar')
drawRadar(ax)
plt.show()
