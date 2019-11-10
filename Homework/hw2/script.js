'use strict'

function vowelСounting() {
	let vowelsNum = 0;
	//russian and english vowels
	let vowels = ['а', 'е', 'ё', 'и','о', 'у', 'ы', 'э', 'ю', 'я', 'a', 'e', 'i', 'o', 'u'];
	let usersString = prompt('Введите строку').toLowerCase();

	for(let char of usersString) {
		for(let vowel of vowels) {
			if(char == vowel) {
					vowelsNum +=1;
					break;
				}
			}
		}
	return vowelsNum;
}


console.log(vowelСounting());