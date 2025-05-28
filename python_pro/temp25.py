import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False

import matplotlib.font_manager as fm
# 下载并安装思源字体
import urllib.request
import os

font_path = 'Source_Han_Sans.ttf'
if not os.path.exists(font_path):
    font_url = 'https://github.com/adobe-fonts/source-han-sans/raw/release/OTF/SimplifiedChinese/SourceHanSansSC-Regular.otf'
    try:
        urllib.request.urlretrieve(font_url, font_path)
        font = fm.FontProperties(fname=font_path)
    except:
        # 如果下载失败，使用系统默认字体
        font = fm.FontProperties()
else:
    font = fm.FontProperties(fname=font_path)

pi = 3.141592653589793
labels = ['EQ', 'IQ', '人缘', '魅力', '体力', '财富']
attrNum = len(labels)
names = ['张三', '李四', '王五']
# 每个人的六个属性值
data = [[7, 6, 8, 9, 8, 2],  # 张三
        [6, 7, 8, 9, 8, 3],  # 李四
        [8, 7, 8, 9, 8, 4]]  # 王五
angles = [2*pi*i/attrNum for i in range(attrNum)]
angles2 = [x* 180/pi for x in angles]
ax = plt.figure(figsize=(10, 8)).add_subplot(projection='polar')
ax.set_ylim(0, 10)  # 设置数值范围

# 绘制每个人的雷达图
for i, d in enumerate(data):
    ax.plot(angles, d, 'o-', linewidth=2, label=names[i])
    ax.fill(angles, d, alpha=0.25)

ax.set_thetagrids(angles2, labels, fontproperties=font)  # 使用中文字体显示坐标轴标签
ax.set_title('三人能力分析', fontproperties=font, pad=20)  # 使用中文字体显示标题
ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1), prop=font)  # 使用中文字体显示图例
plt.tight_layout()  # 自动调整布局
plt.show()

