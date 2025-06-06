class A:
    def __init__(self,x):
        self.x=x
    def __hash__(self):
        print(hash(self.x))
        return hash(self.x)

c = A(1)
dt = {A(1):2, A(1):3, c:4}
print(len(dt))
for a in dt.items():
    print(a[0].x, a[1], end = ",")
print(dt[c])
#print(dt[A(1)])

