#conding:utf-8

import random
number = random.randint(1,100)

while True:
    num_input = input('input a number:')
    if not num_input.isdigit():
        print('Please input interger.')
    elif int(num_input) < 0 or int(num_input) >= 100:
        print("The number should be in 1 to 100.")
    else:
        if number == int(num_input):
            print('Ok')
            break
        elif number > int(num_input):
            print('your number is smaller.')
        else:
            print('your number is bigger.')
            
