#temp8.py
k = int(input())
if k == 1 or k==2 :
    print(1)
else:
    a1 = a2 = 1
    for i in range(k-2):
        a1,a2 =    a2,a1+a2
    print(a2)
