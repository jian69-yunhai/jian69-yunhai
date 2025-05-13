def f(x):
    print(x,end="")
    return x*x
a = map(f ,(1,2,3))
print(list(a))
print(tuple(a))

a = list(map(lambda x:2*x,[2,3,4]))
print(a)

x,y,z = map(int,input().split())
print(x,y,z)

aa = map(int,input().split())
print(tuple(aa))

def f(x):
    return x%2 == 0
lst = tuple(filter(f,(1,2,3,4,5,6,7)))
print(lst)
