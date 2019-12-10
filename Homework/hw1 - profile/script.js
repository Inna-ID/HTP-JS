var isError = false;
const DAYS_PER_YEAR = 365.25;
const REG_EXP_STRING = /^[а-яА-Яa-zA-Z]+$/;


// Фамилия, имя и отчество содержат одинаковую логику
//// userLastname ////
var userLastname = '';
do {
	userLastname = prompt( (isError ? 'Некорректные данные.\nВведете фамилию': 'Введете фамилию'), 'Иванов');

	if(!userLastname || !REG_EXP_STRING.test(userLastname) || userLastname.length < 2) {
		isError = true;
	} else {
		isError = false;
	}
} while(isError);


//// userName ////
var userName = '';
do {
	userName = prompt( 'Введете имя', 'Иван');

} while( !userName || !REG_EXP_STRING.test(userName) || userName.length < 2 );


//// userPatronymic ////
var userPatronymic = '';
do {
	userPatronymic = prompt( (isError ? `Некорректные данные.\nВведете отчество`: 'Введете отчество'), 'Иванович');

	if( !userPatronymic || !REG_EXP_STRING.test(userPatronymic) || userPatronymic.length < 2 ) {
		isError = true;
	} else {
		isError = false;
	}
} while(isError);


//// userAgeByYears ////
var userAgeByYears = 0;
	do {
	userAgeByYears = prompt( (isError ? `Возраст нужно указать числом в диапазоне от 0.1 до 130.\nВаш возраст`: 'Ваш возраст'), 20);

	if( !userAgeByYears.trim() || userAgeByYears.length < 1) {
		isError = true;	
	}
	//0.1 - 1 month
	else if( (userAgeByYears < 0.1 || userAgeByYears > 130) || isNaN(userAgeByYears) ) {
		isError = true;
	} else {
		isError = false;
		userAgeByYears = parseInt(userAgeByYears);
	}
} while(isError);


var userGender = confirm('Вы мужчина?') ? 'мужской' : 'женский';
var isUserRetiree;

if( userGender === 'мужской') {
	//man
	isUserRetiree = userAgeByYears >= 63 ? 'да' : 'нет';
} else {
	//woman
	isUserRetiree = userAgeByYears >= 58 ? 'да' : 'нет';
}


//округление в меньшую сторону
var userAgeByDays = Math.floor(userAgeByYears * DAYS_PER_YEAR);

var resultText = 
`Ваше ФИО: ${userLastname} ${userName} ${userPatronymic}
Ваш возраст в годах: ${userAgeByYears}
Ваш возраст в днях: ${userAgeByDays}
Через 5 лет вам будет: ${userAgeByYears + 5}
Ваш пол: ${userGender}
Вы на пенсии: ${isUserRetiree}
`;

console.log(resultText);