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

	document.getElementById('date').value = String(currDate.getFullYear()) + '-' + currMonth + '-' + currDay;
}

function authChange() {
	let authNum = Number(document.getElementById('authNum').value);

	let auth1 = document.getElementById('auth1').style.display;
	let auth2 = document.getElementById('auth2').style.display;

	if (authNum == 2) {
		auth1 = 'block';
		auth2 = 'block';
	} else if ((authNum.value == 1) || (authNum.value > 2)) {
		auth1 = 'block';
		auth2 = 'none';
	} else {
		auth1 = 'none';
		auth2 = 'none';
	}
}

function cite() {
	let authNum = document.getElementById('authNum');

	if (authNum > 2) {
		const auth = document.getElementById('lastName1').value + ', ' + document.getElementById('firstName1').value + ' et al. ';
	} else if (authNum == 2) {
		const auth = document.getElementById('lastName1').value + ', ' + document.getElementById('firstName1').value + ', and ' + document.getElementById('firstName2').value + ' ' + document.getElementById('lastName2').value + '. '
	} else if (authNum == 1) {
		const auth = document.getElementById('lastName1').value + ', ' document.getElementById('firstName1') + '. ';
	}

	const article = '"' + document.getElementById('article').value + '". ';

	const website = document.getElementById('website') + ', '

	if (document.getElementById('pubYear') == -1) {
		const pubDate = '';
	} else {
		const pubDate = document.getElementById('pubYear').value + ', ';
	}

	const url = document.getElementById('url').value + '. ';

	const accessDate = 'Accessed DATE.';

	document.write(auth + article + website + pubDate + url + accessDate)
}

onStart();