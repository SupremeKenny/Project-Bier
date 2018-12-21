function validateEmail(email) {
	let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
}

function validateZipCode(zip) {
	let regex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
	return regex.test(zip);
}

function validatePhoneNumber(number) {
	return /^\d{7,}$/.test(number.replace(/[\s()+\-\.]|ext/gi, ""));
}

function validateName(name) {
	name = name.toLowerCase();
	let regex = /^[a-z][a-z\s]*$/;
	return regex.test(name);
}

function validateNum(num) {
	let regex = /^\d+$/;
	return regex.test(num);
}

export { validateEmail, validateZipCode, validatePhoneNumber, validateName, validateNum };
