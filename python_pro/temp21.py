import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'KaiTi', 'FangSong', 'STSong', 'NSimSun']
plt.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题
ax = plt.figure().add_subplot()
# barh函数创建横向条形图：y定义条形的垂直位置，width定义条形的长度，height定义条形的粗细
ax.barh(y=(0.2,0.6,0.8,1.2), width=(1,2,3,0.5), height=0.1)
ax.set_title('横向条形图')
plt.show()

