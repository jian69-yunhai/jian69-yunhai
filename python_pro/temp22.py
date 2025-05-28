import matplotlib.pyplot as plt

def drawPie(ax):
    lbs = ('A', 'B', 'C', 'D')
    secotors = [16, 29.55, 44.45, 10]
    expl = [0, 0.1, 0, 0]  # only "B" is exploded
    ax.pie(x=secotors, labels=lbs, explode=expl, autopct='%.2f', shadow=True,
           labeldistance=1.1, pctdistance=0.6, startangle=90)
    ax.set_title("Pie sample")

ax = plt.figure().add_subplot()
drawPie(ax)
plt.show()

