var drinkStorage = new HashStorage();

drinkStorage.addValue('Mojito', {isAlcohol: 'no', recipe: [ 'soda', 'mint' ,'lime']});
drinkStorage.addValue('Margarita', {isAlcohol: 'yes', recipe: [ 'tequila', 'cointreau' ,'lime juice', 'ice frappe']});
drinkStorage.addValue('Blue hawaii', {isAlcohol: 'yes', recipe: [ 'rum', 'pineapple juice', 'coconut puree', 'Blue Curacao liquor']});


// auxiliary functions
function setError(domElement) {
	domElement.parentNode.classList.add('error');
}

function removeInfoText() {
	document.querySelector('.result-info').innerHTML = '';
}

function removeErrorClass(currentChildrens) {
	var fields = [];
	//find children elements with "field" class name
	for(var i = 0; i < currentChildrens.length; i++) {
		if(currentChildrens[i].classList.contains('field')) {
			fields.push(currentChildrens[i]);
		}
	}
	// remove all error classes
	[].forEach.call(fields, function(elem) {
    	elem.classList.remove('error');
	});
}

//// hide/show forms function ////
//add an event listener to several elements
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
				div.style.display = 'block';
			}
		}
	})
});


//// addDrink function ////
function addDrink() {
	var drinkNameInput = document.getElementById('add-drink-name_input');
	var drinkName = drinkNameInput.value;
	var isAlc = document.getElementById('add-drink-alc_input').checked;
	var drinkRecipeInput = document.getElementById('add-drink-recipe_input');
	var recipe = drinkRecipeInput.value;
	var isError = false;

	if(!drinkName) {
		setError(drinkNameInput);
		isError = true;
		alert('Input drink name');
	}
	if(drinkName && drinkStorage.getKeys().includes(drinkName)){
		setError(drinkNameInput);
		isError = true;
		alert('This drink exist');
		return;
	} 
	if(recipe.length === 0) {
		setError(drinkRecipeInput);
		isError = true;
		alert('Input drink recipe');
	}

	if(!isError) {
		//split up the string to array
		var recipeArray = recipe.split(',');
		for(var i = 0; i < recipeArray.length; i++) {
			recipeArray[i] = recipeArray[i].trim();
		}

		drinkStorage.addValue(drinkName, {isAlcohol: isAlc ? 'yes': 'no', recipe: recipeArray });
	}
}


//// getInfo function ////
function getInfo() {
	var drinkNameInput = document.getElementById('info-drink-name_input');
	var drinkName = drinkNameInput.value.trim();

	removeInfoText();

	if(!drinkName) {
		setError(drinkNameInput);
		alert('Input drink name');
	}

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

				p.innerHTML += `${key}: ${result[key].join(', ')}`;
				textContainer.appendChild(p);
			} else {
				var p = document.createElement(p);

				p.innerHTML += `${key}: ${result[key]}`;
				textContainer.appendChild(p);
			}
		}
	}
}


//// deleteDrink function ////
function deleteDrink() {
	var drinkNameInput = document.getElementById('delete-drink-name_input');
	var drinkName = drinkNameInput.value.trim();

	if(!drinkName) {
		setError(drinkNameInput);
		alert('Input drink name');
	}
	else if(drinkName && !drinkStorage.getKeys().includes(drinkName)) {
		setError(drinkNameInput);
		alert('This drink not exist');
	} else {
		drinkStorage.deleteValue(drinkName);
		alert(`${drinkName} removed successfully`);
	}
}

function getAllInfo() {
	var drinkNames = drinkStorage.getKeys();
	var p = document.createElement('p');
	var textContainer = document.querySelector('.result-info');

	p.innerHTML += drinkNames.join(', ');
	textContainer.appendChild(p);
}


//// event listener for add drink form by submit form////
document.getElementById('add-drink_form').addEventListener('submit', function(e) {
	e.preventDefault();

	removeErrorClass(this.children);
	//and check again
	addDrink();
});


//// event listener for delete drink form by submit form////
document.getElementById('delete-drink-form').addEventListener('submit', function(e) {
	e.preventDefault();
	removeErrorClass(this.children);
	deleteDrink();
});


//// event listener for get info drink form by submit form////
document.getElementById('drink-info_form').addEventListener('submit', function(e) {
	e.preventDefault();
	removeErrorClass(this.children);
	getInfo();
});


document.getElementById('all-drink-names_btn').onclick = function() {
	removeInfoText();	
	let formWrapDivs = document.querySelectorAll('.form-wrap');
	for(let div of formWrapDivs) {
		div.style.display = 'none';
	}
	getAllInfo();
}