#OVERVIEW: newspaper3k is an amazing module that can get information more accurate than when I hand cite (I checked with an old paper!)
#However, as far as I can see, it doesn't have website or publisher name. These shouldn't be too hard to scrape, but there is also a js
#alternative to this https://metascraper.js.org/#/ that does have those things. I will have to see if that one has the same accuracy and
#if it offers a gain in speed (the download function is pretty terribly slow). If speed wasn't an issue. I would just use newspaper3k and 
#the other one as a fallback, but speed is pretty much the only reason I am making this. So maybe that will tip the scale towards js, but
#also a wide variety could be even better and I wouldn't be any slower than what's already there so I'm not losing too much
#I've written too much.

from newspaper import Article

#TODO get the url with Flask
url = 'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance'
url = 'https://commons.wikimedia.org/wiki/File:%E7%8E%AF%E5%A4%AA%E5%B9%B3%E6%B4%8B%E5%9C%B0%E5%8C%BA.svg'

article = Article(url)
article.download()
article.parse()

print(article.authors) #TODO split with only last space in name so middle names get thrown in with first name
print(article.publish_date.year)
print(article.title)
print('WEBSITE NAME')
print('PUBLISHER')
print(url)
print('2018-12-30')

#Newspaper TODO
#Set limits on stuff like authors to squeeze out speed - Bottom of https://newspaper.readthedocs.io/en/latest/user_guide/advanced.html#adding-new-languages
#Figure out how to do multithreading for two clients so the site doesn't get destroyed if it grows - https://github.com/codelucas/newspaper/blob/master/docs/user_guide/advanced.rst