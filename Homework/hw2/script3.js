'use strict'

//russian and english vowels
const VOWELS = ['а', 'е', 'ё', 'и','о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u'];
const USERSTRING = prompt('Введите строку', 'Привет').toLowerCase().split('');


function foreachFindVowelsCount(str) {
	let vowelsNum = 0;
	str.forEach((char) => {
		if(VOWELS.includes(char)) {
			vowelsNum += 1;
		}
	});
	return vowelsNum;
}


function filterFindVowelsCount (str) {
	return str.filter( (char) => (VOWELS.includes(char))).length;
}


function reduceFindVowelsCount(str) {
	var checkVowelFunc = (vowelsNum, item, i, arr) => (VOWELS.includes(item) ? vowelsNum + 1 : vowelsNum);
	return str.reduce(checkVowelFunc, 0);
}


console.log(`Vowels count by forEach method ${foreachFindVowelsCount(USERSTRING)}`);
console.log(`Vowels count by filter method ${filterFindVowelsCount(USERSTRING)}`);
console.log(`Vowels count by reduce method ${reduceFindVowelsCount(USERSTRING)}`)

//// review
// the same comments as for the first task