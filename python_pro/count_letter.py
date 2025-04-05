# coding:utf-8

s = 'Life is short You need python'

d = {}
for letter in s:
    if letter.isalpha():
        if letter in d:
            d[letter] += 1
        else:
            d[letter] = 1

print(d)

