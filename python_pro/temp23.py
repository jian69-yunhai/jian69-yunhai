import numpy as np
from matplotlib import pyplot as plt
# 生成20个0-100之间的随机整数，并重塑为4行5列的二维数组，用于热力图显示
data = np.random.randint(0, 100, 20).reshape(4, 5)
xlables = ['BeiJing', 'ShangHai', 'ChengDu','GuangZhou', 'HangZhou']
ylables = ['2016', '2017', '2018', '2019']
ax = plt.figure(figsize=(10, 8)).add_subplot()
ax.set_yticks(range(len(ylables)))
ax.set_yticklabels(ylables)
ax.set_xticks(range(len(xlables)))
ax.set_xticklabels(xlables)
heatMp = ax.imshow(data, cmap=plt.cm.hot, aspect='auto',vmin=0, vmax=100)
for i in range(len(xlables)):
    for j in range(len(ylables)):
        ax.text(i, j, data[j, i], ha='center', va='center', color='blue', size=26)
plt.colorbar(heatMp)
plt.xticks(rotation=45,ha='right')
plt.title('Sales Volume(ton)')
plt.show()
