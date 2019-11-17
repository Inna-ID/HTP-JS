var drinkStorage = new HashStorage();

drinkStorage.addValue('Mojito', {isAlcohol: 'no', recipe: [ 'soda', 'mint' ,'lime']});
drinkStorage.addValue('Margarita', {isAlcohol: 'yes', recipe: [ 'tequila', 'cointreau' ,'lime juice', 'ice frappe']});
drinkStorage.addValue('Blue hawaii', {isAlcohol: 'yes', recipe: [ 'rum', 'pineapple juice', 'coconut puree', 'Blue Curacao liquor']});



function setError(domElement) {
	domElement.parentNode.classList.add('error');
}

function removeInfoText() {
	document.querySelector('.result-info').innerHTML = '';
}

//// addDrink function ////
function addDrink() {
	var drinkNameInput = document.getElementById('add-drink-name_input');
	var drinkName = drinkNameInput.value;
	var isAlc = document.getElementById('add-drink-alc_input').checked;
	var drinkRecipeInput = document.getElementById('add-drink-recipe_input');
	var recipe = drinkRecipeInput.value;

	if(!drinkName) {
		setError(drinkNameInput);
		alert('Input drink name');
	}
	if(recipe.length === 0) {
		setError(drinkRecipeInput);
		alert('Input drink recipe');
	}
	if(drinkName && drinkStorage.getKeys().includes(drinkName)){
		setError(drinkNameInput);
		alert('This drink exist');
		return;
	}

	var recipeArray = recipe.split(',');
	for(var i = 0; i < recipeArray.length; i++) {
		recipeArray[i] = recipeArray[i].trim();
	}

	drinkStorage.addValue(drinkName, {isAlcohol: isAlc ? 'yes': 'no', recipe: recipeArray });
}


//// event listener for add drink form by submit form////
document.getElementById('add-drink_form').addEventListener('submit', function(e) {
	e.preventDefault();

	var divs = document.getElementsByClassName('field');
	// remove all error classes
	[].forEach.call(divs, function(elem) {
    	elem.classList.remove('error');
	});
	//and check for again
	addDrink();
});



//// getInfo function ////
function getInfo() {
	var drinkNameInput = document.getElementById('info-drink-name_input');
	var drinkName = drinkNameInput.value.trim();

	if(!drinkName) {
		setError(drinkNameInput);
		alert('Input drink name');
	}

	removeInfoText();

	var result = drinkStorage.getValue(drinkName);
	var textContainer = document.querySelector('.result-info');

	if(!result){
		var p = document.createElement('p');

		p.innerHTML += 'the drink not exist';
		textContainer.appendChild(p);
	} else {
		console.log(result);
		for(var key in result) {
			if(Array.isArray(result[key])) {
				var p = document.createElement('p');

				p.innerHTML += `${key}: ${result[key].join(', ')} `;
				textContainer.appendChild(p);
			} else {
				var p = document.createElement(p);

				p.innerHTML += `${key}: ${result[key]} `;
				textContainer.appendChild(p);
			}
		}
	}
}


//// event listener for get info drink form by submit form////
document.getElementById('drink-info_form').addEventListener('submit', function(e) {
	e.preventDefault();
	//найти чилдренов формы, а у них элементы с классом field

	var div = document.getElementsByClassName('field');
	// remove all error classes
	[].forEach.call(div, function(elem) {
    	elem.classList.remove('error');
	});
	getInfo();
});



document.getElementById('all-drinks-info_btn').onclick = function() {
	drinkStorage.getKeys();
}


//// hide/show forms function ////
//add an event listener to multiple elements
document.querySelectorAll('.menu-btn').forEach( function(item) {
	item.addEventListener('click', function(event) {
		removeInfoText();

		let formWrapDivs = document.querySelectorAll('.form-wrap');
		for(let div of formWrapDivs) {
			div.style.display = 'none';
		}

		//attr data-form
		let dataFormBtn = this.dataset.form;
		// to show needed form
		for(let div of formWrapDivs) {
			if(dataFormBtn === div.dataset.form) {
				div.style.display = 'block'
			}
		}
	})
});
