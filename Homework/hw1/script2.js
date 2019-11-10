var isError = false;
var errorMessage = '';
const DAYS_PER_YEAR = 365.25;
const REG_EXP_STRING = /^[а-яА-Яa-zA-Z]+$/;

// Фамилия, имя и отчество содержат одинаковую логику
//// userLastname ////
var userLastname = '';
do {
	userLastname = prompt( (isError ? `${errorMessage}\nВведете фамилию`: 'Введете фамилию'), 'Иванов');

	if(!userLastname ) {
		isError = true;
	} else if(!REG_EXP_STRING.test(userLastname)) {
		errorMessage = 'Фамилия должна содержать только буквы.';
		isError = true;
	} else if( userLastname.length < 2 ) {
		errorMessage = 'Слишком короткая фамилия.';
		isError = true;
	} else {
		isError = false;
	}
} while(isError);


//// userName ////
var userName = '';
do {
	userName = prompt( (isError ? `${errorMessage}\nВведете имя`: 'Введете имя'), 'Иван');

	if(!userName || !userName.trim() ) {
		isError = true;
	} else if( userName.length < 2 ) {
		errorMessage = 'Слишком короткое имя.';
		isError = true;
	} else if(!REG_EXP_STRING.test(userName)) {
		errorMessage = 'Имя должно содержать только буквы.';
		isError = true;
	} else {
		isError = false;
	}
} while(isError);


//// userPatronymic ////
var userPatronymic = '';
do {
	userPatronymic = prompt( (isError ? `${errorMessage}\nВведете отчество`: 'Введете отчество'), 'Иванович');

	if(!userName || !userName.trim() ) {
		isError = true;
	} else if( userPatronymic.length < 2) {
		errorMessage = 'Слишком короткое отчество.';
		isError = true;
	} else if(!REG_EXP_STRING.test(userPatronymic)) {
		errorMessage = 'Отчество должно содержать только буквы.';
		isError = true;
	} else {
		isError = false;
	}
} while(isError);


//// userAgeByYears ////
var userAgeByYears = 0;
	do {
	userAgeByYears = prompt( (isError ? `${errorMessage}\nВаш возраст`: 'Ваш возраст'), 20);

	if( !userAgeByYears.trim() || userAgeByYears.length < 1) {
		errorMessage = 'Возраст не указан.';
		isError = true;	
	}

	//0.1 - 1 month
	else if( userAgeByYears < 0.1 || userAgeByYears > 130 ) {
		errorMessage = 'Возраст нужно указать в диапазоне от 0.1 до 130.';
		isError = true;
	} else if(isNaN(userAgeByYears)) {
		errorMessage = 'Вы ввели не число.';
		isError = true;
	}
	else {
		isError = false;
		userAgeByYears = parseInt(userAgeByYears);
	}
} while(isError);


var userGender = confirm('Вы мужчина?') ? 'мужской' : 'женский';
var isUserRetiree = confirm('Вы на пенсии?') ? 'да' : 'нет';

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