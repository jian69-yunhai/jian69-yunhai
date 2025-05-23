import os
print("输出结果1："+os.getcwd())
os.chdir("c:\\Users\\jian")
print("输出结果2："+os.getcwd())
os.chdir("C:\\Users\\jian\\git\\jian69-yunhai\\python_pro")
print("输出结果3："+os.getcwd())
lst = os.listdir()
print("输出结果4："+str(lst))

