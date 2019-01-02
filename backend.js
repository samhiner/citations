// LIBRARY IMPORTS

const got = require('got');
const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')()
]);

console.time('Runtime');

// GET CITATION DATA

//TODO reject invalid urls to speed up process?
const targetUrl = 'https://500px.com/photo/95611289/one-new-york-plaza-new-york-city-ny-by-oliver-hannak';

(async () => {
	const {body: html, url} = await got(targetUrl)
	const metadata = await metascraper({html, url})


	//TODO if null end process

	console.log('Author(s):', metadata.author);
	if (metadata.date != null) { //NOTE temporary measure
		console.log('Pub Year:', metadata.date.split('-')[0]);
	}

	console.log('Article Title:', metadata.title);
	//The thing that metascraper calls publisher is an MLA website title
	console.log('Website Name:', metadata.publisher);
	console.log('Publisher:', getPublisher(html));
	console.log('URL:', metadata.url);

	console.timeEnd('Runtime');
})();

// GETTING PUBLISHER

function getPublisher(html) {
	var index = publisherStartIndex(html);
	//TODO change this so it runs again at different index or something (maybe do running from different index int he other function or make a function handler between this and that one)
	while (index == -1) {
		return '';
	}
	var startIndex = index;
	var publisher = '';
	var tagMode = false;
	var bracketMode = false;
	var nestLevel = 0;

	while (index < html.length && index - startIndex < 300) { //TODO decide if keep 300 limit and if so add it to pubStart
		if (!tagMode && !bracketMode) {
			if (['.', '>', '"', '\n'].indexOf(html[index].toLowerCase()) == -1 && !indexStartsWord('all rights reserved', index, html)) {
				//TODO could break with <span id="hello>sdsd">
				if (html[index] != '<') {
					//TODO same as above comment
					if (html.slice(index, index + 2) != '{{') {
						publisher += html[index];
					} else {
						bracketMode = true;
						index += 1;
					}
				} else {
					if (html[index + 1] == '/') {
						nestLevel -= 1;
						if (nestLevel < 0) {
							return publisher;
						}
					} else {
						nestLevel += 1
					}

					tagMode = true;
				}
			} else {
				return publisher
			}
		} else if (tagMode) {
			if (html[index] == '>') {
				tagMode = false;
			}
		} else if (bracketMode) {
			if (html.slice(index, index + 2) == '}}') {
				bracketMode = false;
			}
		}
		index += 1
	}
}

//TODO heavily refactor
//PROBLEM must communicate if first © didn't work, try the next one etc. Maybe do a searchFrom parameter for publisherStartIndex()
function publisherStartIndex(html) {
	var keywords = ['©', '&copy', 'Copyright'];
	var copyrightPos;
	var tagMode = false;
	var bracketMode = false;

	for (x in keywords) {
		keyword = keywords[x];
		copyrightPos = html.lastIndexOf(keyword)
		if (copyrightPos != -1) {
			var index = copyrightPos + keyword.length

			if (keyword == '&copy' && html[index] == ';') {
				index += 1;
			}

			while (index < html.length) {
				if (!tagMode && !bracketMode) {
					if ([' ', '-', '.', '©'].indexOf(html[index].toLowerCase()) == -1 && !indexStartsWord('by', index, html) && !indexStartsWord('copyright', index, html)) {
						//if it is not a year
						if (isNaN(html.slice(index, index + 4))) {
							//TODO could break with <span id="hello>sdsd">
							if (html[index] != '<') {
								//TODO same as above comment
								if (html.slice(index, index + 2) != '{{') {
									return index;
								} else {
									bracketMode = true;
									index += 1;
								}
							} else {
								tagMode = true;
							}
						} else {
							//only do 3 and not 4 for the length of a year (e.g. 2019), because everything gets added by 1 at the end of the round
							index += 3;
						}
					} else {
						if (indexStartsWord('by', index, html)) {
							index += 1;
						} else if (indexStartsWord('copyright', index, html)) {
							index += 8;
						}
					}
				} else if (tagMode) {
					if (html[index] == '>') {
						tagMode = false;
					}
				} else if (bracketMode) {
					if (html.slice(index, index + 2) == '}}') {
						bracketMode = false;
					}
				}
				index += 1
			}
		}
	}
	return -1;
}

//check to see if the index is at the start of the defined word
function indexStartsWord(word, index, html) {
	if (index + word.legnth < html.length) {
		if (html.slice(index, index + word.length).toLowerCase() == word) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}