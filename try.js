//UPDATE metascraper is much more versatile for things like non-articles so I am using
//it over newspaper3k. All I will have to get is the publisher, which should be pretty
//easy. If possible I'd like to integrate it into the first metadata request so I don't
//have to request twice (would that be the html var?)

const got = require('got');
const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')()
]);

//TODO reject invalid urls to speed up process?
const targetUrl = 'https://thehill.com/homenews/administration/423292-trump-says-all-concrete-wall-was-never-abandoned-contradicting-john';

(async () => {
	const {body: html, url} = await got(targetUrl)
	const metadata = await metascraper({html, url})

	console.log('Author(s)' metadata.author.split(', '))
	console.log('Pub Year', metadata.date.split('-')[0])
	console.log('Article Title', metadata.title)
	//What metascraper calls publisher is an MLA website title
	console.log('Website Name', metadata.publisher)
	console.log('Publisher', null)
	console.log('URL', metadata.url)

	console.timeEnd('Runtime')
})()