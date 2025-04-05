#coding:utf-8
"""
例1:编写程序，根据输入的半径，计算圆的面积。
"""

import math
r = float(input("Enter the radius of circle:"))
area = math.pi * r * r

print("The area is :",round(area,2))
