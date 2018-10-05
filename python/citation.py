print('Guide: 1 is yes, 0 is no. If an author does not have two names, put a # for the last name.')

num_authors = input('Number of authors? ')

if num_authors == 2:
    names = [[input('First Name: '), input('Last Name: ')],[input('First Name: '), input('Last Name: ')]]
elif num_authors >= 3 or num_authors == 1:
    first = input('First Name: ')
    last = input('Last Name: ')
    :
    if last == '#':
        author = '%s.' % first
    else:
        author = '%s, %s.' % last, first

    if !et_al_check:
        var = input('Over three authors? ')


else:
    names = []

print(names)
