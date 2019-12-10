'use strict'

function СountVowels() {
	let vowelsNum = 0;
	//russian and english vowels
	let vowels = ['а', 'е', 'ё', 'и','о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u'];
	let usersString = prompt('Введите строку');

	for(let char of usersString) {
		if(vowels.includes(char.toLowerCase())) {
				vowelsNum +=1;
			}
		}
	return vowelsNum;
}

console.log(СountVowels());


//before review
// for(let char of usersString) {
// 	for(let vowel of vowels) {
// 		if(char == vowel) {
// 				vowelsNum +=1;
// 				break;
// 			}
// 		}
// 	}

// let usersString = prompt('Введите строку').toLowerCase()
// don't change usersString. and add toLowerCase() to single letters