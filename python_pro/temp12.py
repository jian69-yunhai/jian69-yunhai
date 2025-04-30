#temp12.py
def Hanoi(n,src,mid,dest):
    if n == 1:
        print(f"Move disk 1 from {src} to {dest}")
        return
    Hanoi(n-1,src,dest,mid)
    print(f"Move disk {n} from {src} to {dest}")
    Hanoi(n-1,mid,src,dest)

n = int(input())
Hanoi(n,"A","B","C")

