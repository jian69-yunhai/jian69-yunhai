#coding:utf-8
'''
编写程序，实现对输入字符串的大小写字母翻转
（即大写变小写、小写变大写）操作。
'''

word = input('please input an English word:')
new_lst = []
for i in word:
    if i.islower():
        new_lst.append(i.upper())
    else:
        new_lst.append(i.lower())
new_word = "".join(new_lst)
print(word,"==>",new_word)

