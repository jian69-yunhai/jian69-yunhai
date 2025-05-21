print([x*x for x in range(1,11)])
print([x * x for x in range(1,11) if x % 2 == 0])
print([m + n for m in "ABC" for n in "XYZ"])
print([[m+n for m in 'ABC'] for n in 'XYZ'])
L = ['Hello', 'World', 18 , 'Apple', None]
print([s.lower() for s in L if isinstance(s, str)])
print([s for s in L if isinstance(s,int)])
print(tuple(x * x for x in range(1,11)))


       