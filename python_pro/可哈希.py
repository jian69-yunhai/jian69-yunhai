x =23.1
print(x.__hash__(),23.1.__hash__())
x = 23
print(x.__hash__(),hash(23))
x = (1,2)
print(x.__hash__(),(1,2).__hash__(),hash(x))
x = "ok"
print(x.__hash__(),"ok".__hash__())

class A:
    def __init__(self,x):
        self.x = x
a,b = A(5), A(5)
dt = {a:20,A(5):30,b:40}
print(len(dt), dt[a], dt[b])
#print(dt[A(5)])

