#temp13.py
import turtle
def snow(n,size):
    if n==0:
        turtle.fd(size)
    else:
        for angle in [0,60,-120,60]:
            turtle.left(angle)
            snow(n-1,size/3)

turtle.setup(800,600)
turtle.penup()
turtle.goto(-300,-50)
turtle.pendown()
turtle.pensize(3)
snow(3,600)
turtle.done()
