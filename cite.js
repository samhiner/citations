//TODO refactor everything below
	//TODO add documentation
	//TODO add input validation (means make sure all areas are filled and it doesn't have unpredictable behavior when users do weird things)
		//TODO for example if author is visible and not filled in make it requried
		//TODO figure out n.p.
	//TODO make sure that people can't hack the site through the URL submit with XSS or something
//TODO double spaced and page margins (maybe a document outline)
	//TODO Analyze google docs to find out how they define margins in html and copy that for the citation output to see if it copies over to drive
//TODO turn url into escape codes before giving it to server
	//TODO should I convert it back to plain text for URL part of citation?
//TODO Collect data on what percent of AutoCite's are successful

//add zeroes in front of an input until it fills the required spaces
function leadingZero(input, spaces) {
	if (input.length < spaces) {
		return leadingZero('0' + input)
	} else {
		return input
	}
}

//fill in the access date with the current date
function setAccessDate() {
	currDate = new Date();
	currMonth = leadingZero(String(currDate.getMonth() + 1), 2);
	currDay = leadingZero(String(currDate.getDate()), 2);

	$('#accessDate').val(String(currDate.getFullYear()) + '-' + currMonth + '-' + currDay);
}

//show a different number of inputs for author based on the number specified by user
function authorChange() {
	let numAuthors = Number($('#numAuthors')[0].value);

	let author1 = $('#author1')[0].style.display;
	let author2 = $('#author2')[0].style.display;

	if (numAuthors == 2) {
		author1 = 'block';
		author2 = 'block';
	} else if ((numAuthors == 1) || (numAuthors > 2)) {
		author1 = 'block';
		author2 = 'none';
	} else {
		author1 = 'none';
		author2 = 'none';
	}

}

//turn name into MLA version of name based on position
	//ord (1 <= int <= 2): where does it appear in citation. e.g. it would be 1 for John and 2 for Jack in "John and Jack"
function createName(name, ord) {
	if (ord == 1) {
		//if last name isn't filled, MLA name is only first name. Else, it is "last, first"
		return name[1] == '' ? name[0] : name[1] + ', ' + name[0];
	} else {
		return name[1] == '' ? name[0] : name[0] + ' ' + name[1];
	}
}

function createAuthorList(numAuthors) {
	var name1 = createName([$('#firstName1')[0].value, $('#lastName1')[0].value], 1)

	if (numAuthors > 2) {
		var author = name1 + ' et al. ';
	} else if (numAuthors == 2) {
		var name2 = createName([$('#firstName2')[0].value, $('#lastName2')[0].value], 2)
		var author = name1 + ', and ' + name2 + '. ';
	} else if (numAuthors == 1) {
		var author = name1 + '. ';
	} else {
		var author = '';
	}
}

//TODO break up this function
//megafunction that cites based on given data
function cite() {
	let numAuthors = $('#numAuthors')[0].value;

	var article = '"' + $('#article')[0].value + '". ';

	var website = '<em>' + $('#website')[0].value + '</em>, ';

	var publisher = $('#publisher')[0].value + ', ';

	if ($('#publisher')[0].value == $('#website')[0].value) {
		publisher = '';
	}

	var pubYear = $('#pubYear')[0].value == '' ? '' : $('#pubYear')[0].value + ', ';

	var url = $('#url')[0].value + '. ';

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	var rawAccessDate = $('#accessDate')[0].value.split('-')

	while (String(rawAccessDate[2])[0] == '0') {
		rawAccessDate[2] = rawAccessDate[2].substr(1);
	}

	var accessDate = 'Accessed ' + rawAccessDate[2] + ' ' + months[rawAccessDate[1] - 1] + ' ' + rawAccessDate[0];

	$('#citation')[0].innerHTML = author + article + website + publisher + pubYear + url + accessDate + '.';

	const inTextName1 = $('#lastName1')[0].value || $('#firstName1')[0].value;

	if (numAuthors == 1) {
		var inTextCite = inTextName1;
	} else if (numAuthors == 2) {
		const inTextName2 = $('#lastName2')[0].value || $('#firstName2')[0].value;
		var inTextCite = inTextName1 + ', and ' + inTextName2;
	} else if (numAuthors > 2) {
		var inTextCite = inTextName1 + ' et al.';
	} else {
		var inTextCite = '"' + $('#article')[0].value + '"';
	}

	$('#in-text')[0].innerHTML = '(' + inTextCite + ')';
}

setAccessDate();