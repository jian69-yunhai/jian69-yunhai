#temp10.py
n = int(input())
for i in range(2,n+1):
    ok = True
    for k in range(2,i):
        if i%k == 0:
            ok = False
            break
    if ok:
        print(i," ",end=" ")
        