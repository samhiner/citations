import re
import urllib.request
import json

url = 'https://www.nytimes.com/2018/12/30/us/politics/donna-shalala-congress.html'
#NOTE no non ASCII chars.
#Also must replace spaces and other like chars with escape codes like %20 (will need a function for doing this)
title = '%20'.join("Too Old to Be a Freshman in Congress?".split(' '))
#NOTE cannot have leading www
domain = 'nytimes.com'

text = json.load(urllib.request.urlopen('http://newsapi.org/v2/everything?domains=' + domain + '&q="' + title + '"&apiKey=9b8e51b1ad0640eba7d7c4eb99217de3'))
print(text['articles'][0]['author'])

'''
text = 'this is a byline and another byline and a third byline'
checkpoints = [x.start() for x in re.finditer('byline', text)]
checkpoints.extend([x.start() for x in re.finditer('author', text)])
'''