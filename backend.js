//UPDATE metascraper is much more versatile for things like non-articles so I am using
//it over newspaper3k. All I will have to get is the publisher, which should be pretty
//easy. Also metascraper is way faster

const got = require('got');
const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')()
]);

console.time('Runtime');

//TODO reject invalid urls to speed up process?
const targetUrl = 'https://500px.com/photo/95611289/one-new-york-plaza-new-york-city-ny-by-oliver-hannak';

(async () => {
	const {body: html, url} = await got(targetUrl)
	const metadata = await metascraper({html, url})

	//console.log(html)

	//TODO if null end process

	console.log('Author(s):', metadata.author);
	if (metadata.date != null) { //NOTE temporary measure
		console.log('Pub Year:', metadata.date.split('-')[0]);
	}

	console.log('Article Title:', metadata.title);
	//The thing that metascraper calls publisher is an MLA website title
	console.log('Website Name:', metadata.publisher);
	console.log('Publisher:', null);
	console.log('URL:', metadata.url);

	console.timeEnd('Runtime');
})();


var string = 'yo wass hello my name is hello sam';

console.log(string.lastIndexOf('hello'))
function getPublisher(html) {
	var keywords = ['©', '&copy', 'Copyright'];
	var publisher = '';
	var copyrightPos;
	var tagMode;

	//TODO prolly best to do 2 for loops one for starting one for stopping
	for (keyword in keywords) {
		copyrightPos = html.lastIndexOf(keyword)
		if (copyrightPos != -1) {
			var index = copyrightPos + keyword.length
			while (a) {
				if (!tagMode && !bracketMode) {
					if ([' ', '-', 'by', 'copyright', '.'].indexOf(html[index].toLowerCase()) == -1) {
						//if it is not a year
						if (html.slice(index, index + 4).isNaN()) {
							//TODO could break with <span id="hello>sdsd">
							if (html[index] != '<') {
								then {{}}
							} else {
								tagMode = true;
							}
						} else {
							//only do 3 and not 4 for the length of a year (e.g. 2019), because everything gets added by 1 at the end of the round
							index += 3;
						}
					}
				} else if (tagMode) {
					if (html[index] == '>') {
						tagMode = false;
					}
				} else if (bracketMode) {

				}
				index += 1
			}
		}
	}

	if (publisher != '') {

	}
}

///PUBLISHER
//TODO convert &amp in title to right thing and eval other html
/*
find ©
find &copy
find Copyright (case specific)

All the while:
	if the keyword isn't 'Copyright':
		as you are iterating over chars after keyword ignore stuff in tags
		so basically just get the first non tag/'Copyright'/year/-/'by'/space/'.'/{{x}} data
			if you are using '&copy' make sure to ignore a ; after the '&copy'
		stop when you see '.'/'"'/tag end if no new tags began in title
	else:
		same just ignore year



for x:
	if numeric:
		check to see if a year/year range (should be len 4/2 or 4/4 or 4)*/