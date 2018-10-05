//TODO comment all of this lol
//TODO cite access dates
//TODO italics and Times New Roman 12 pt double spaced
//TODO page margins

function leadingZero(input, spaces) {
	if (input.length < spaces) {
		return leadingZero('0' + input)
	} else {
		return input
	}
}

function onStart() {
	currDate = new Date();
	currMonth = leadingZero(String(currDate.getMonth() + 1), 2);
	currDay = leadingZero(String(currDate.getDate()), 2);

	document.getElementById('accessDate').value = String(currDate.getFullYear()) + '-' + currMonth + '-' + currDay;
}

function authChange() {
	let authNum = Number(document.getElementById('authNum').value);

	let auth1 = document.getElementById('auth1').style.display;
	let auth2 = document.getElementById('auth2').style.display;

	if (authNum == 2) {
		document.getElementById('auth1').style.display = 'block';
		document.getElementById('auth2').style.display = 'block';
	} else if ((authNum == 1) || (authNum > 2)) {
		document.getElementById('auth1').style.display = 'block';
		document.getElementById('auth2').style.display = 'none';
	} else {
		document.getElementById('auth1').style.display = 'none';
		document.getElementById('auth2').style.display = 'none';
	}

}

function cite() {
	let authNum = document.getElementById('authNum').value;

	if (authNum > 2) {
		var auth = document.getElementById('lastName1').value + ', ' + document.getElementById('firstName1').value + ' et al. ';
	} else if (authNum == 2) {
		var auth = document.getElementById('lastName1').value + ', ' + document.getElementById('firstName1').value + ', and ' + document.getElementById('firstName2').value + ' ' + document.getElementById('lastName2').value + '. '
	} else if (authNum == 1) {
		var auth = document.getElementById('lastName1').value + ', ' + document.getElementById('firstName1').value + '. ';
	} else {
		var auth = ''
	}

	var article = '"' + document.getElementById('article').value + '". ';

	var website = document.getElementById('website').value + ', '

	if (document.getElementById('pubYear') == -1) {
		var pubDate = '';
	} else {
		var pubDate = document.getElementById('pubYear').value + ', ';
	}

	var url = document.getElementById('url').value + '. ';

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	var accessDate = document.getElementById('accessDate').value.split('-')

	while (String(accessDate[2])[0] == '0') {
		accessDate[2] = accessDate[2].substr(1);
	}

	var accessDate = 'Accessed ' + accessDate[2] + ' ' + months[accessDate[1] - 1] + ' ' + accessDate[0];

	document.getElementById('citation').innerText = auth + article + website + pubDate + url + accessDate + '.';

	if (authNum == 1) {
		var inTextCite = document.getElementById('lastName1').value
	} else if (authNum == 2) {
		var inTextCite = document.getElementById('lastName1').value + ', and ' + document.getElementById('lastName2').value
	} else if (authNum > 2) {
		var inTextCite = document.getElementById('lastName1').value + ' et al.';
	} else {
		var inTextCite = '"' + document.getElementById('article').value + '"';
	}

	document.getElementById('in-text').innerText = '(' + inTextCite + ')';
}

onStart();