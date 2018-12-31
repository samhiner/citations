import re
import urllib.request
import json

#NOTE: These ideas are hibernating until I see if my other solution with the newspaper3k
#module is sufficient.

#This relies on NewsAPI to gather info. It would be super easy to implement, but likely
#won't pan out because NewsAPI only does articles from the past month for free and even
#if I could pay for premium, that only goes back one year. Not very useful for citations.
'''
url = 'https://www.nytimes.com/2018/12/30/us/politics/donna-shalala-congress.html'
#NOTE no non ASCII chars.
#Also must replace spaces and other like chars with escape codes like %20 (will need a function for doing this)
title = '%20'.join("Too Old to Be a Freshman in Congress? Donna Shalala Doesn%E2%80%99t Care".split(' '))
#NOTE cannot have leading www
domain = 'nytimes.com'

text = json.load(urllib.request.urlopen('http://newsapi.org/v2/everything?domains=' + domain + '&q="' + title + '"&apiKey=9b8e51b1ad0640eba7d7c4eb99217de3'))
print(text)#['articles'][0]['author'])

#TODO if (text['totalresults'] == 1)
'''

#This is a potential method for finding the author of any website by looking for a byline. 
#I haven't gotten past the issue of websites blicking scrapers yet, but if I return to this
#idea and do get past it, runtime and weird designs could be a concern.
'''
text = 'this is a byline and another byline and author here a third byline >By'

text = urllib.request.urlopen('https://www.ccn.com/1000-point-swings-new-reality-for-dow-jones-index-allianz-economist-el-erian/').read()

checkpoints = [x.start() for x in re.finditer('author', text)]
checkpoints.extend([x.start() for x in re.finditer('byline', text)])

for checkpoint in checkpoints:
	x = checkpoint
	while x + 1 <= len(text) and text[x] != '>':
		x += 1
		if x - checkpoint > 300:
			break

	if text[x+1:x+3] == 'By':
		print(text[x+1:])
		break
'''