#coding:utf-8

class SuperMan:
    '''
    A class of superman
    '''
    def __init__(self,name) :
        self.name = name
        self.gender = 1
        self.single = False
        self.illness = False

    def nine_negative_kungfu(self):
        return "Ya! You have to die."

guojing = SuperMan('guojing') #实例化
print(guojing.name)
print(guojing.gender)
kongfu = guojing.nine_negative_kungfu()
print(kongfu)

