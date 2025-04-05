#conding:utf-8

def p_deco(func):
    def wrapper(name):
        return "<p>{0}</p>".format(func(name))
    return wrapper

def div_deco(func):
    def wrapper(name):
        return "<div>{0}</div>".format(func(name))
    return wrapper

@div_deco
@p_deco
def book(name):
    return "the name of my book is {0}".format(name)

# laoqi = p_deco(book)
# py_book = laoqi("Python大学实用教程")

py_book = book("Python大学实用教程")
print(py_book)
print(book("Python大学实用教程"))



