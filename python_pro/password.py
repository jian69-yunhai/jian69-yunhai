#coding:utf_8
'''
编写程序，利用“凯撒密码”方案，实现对用户输入文字的加密操作。
'''

letter = input("Please input an Englis letter: ")
n = 3
pwd = ord(letter) + n
pwd_letter = chr(pwd)
print(letter, "==>",pwd_letter)

