def getHappiness(length, arr, a, b):
    happiness = 0
    for x in arr:
        if x in a:
            happiness += 1
        elif x in b:
            happiness -= 1

    return happiness

print(getHappiness(0,[1, 5, 3], [3, 1], [5, 7]))