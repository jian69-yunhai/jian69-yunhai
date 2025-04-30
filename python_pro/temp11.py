#temp11.py
def Max(x,y):
    if x > y :
        return x
    else:
        return y

n = Max(4,6)
print(n,Max(20,n))
print(Max("about","take"))

def IsPrime(n):
    if n <= 1 or n % 2 == 0 and n != 2:
        return False
    else:
        for i in range(3,n,2):
            if n % i == 0:
                return False
            if i * i > n:
                break
    return True

for i in range(1,100):
    if IsPrime(i):
        print(i,end=" ")