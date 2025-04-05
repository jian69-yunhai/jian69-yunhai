import random

# Generate 20 random floating-point numbers between 1 and 100
random_floats = [random.uniform(1, 100) for _ in range(20)]

# Print the random floating-point numbers
print("20 random floating-point numbers between 1 and 100:")
for number in random_floats:
    print(number)
