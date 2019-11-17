'use strict'

class HashStorage {
	constructor(drinkName) {
		this.storage = {}
	}
	addValue(key, value) {
 		this.storage[key] = value;
	}

	getValue(key) {
		if(this.storage[key]) {
			//console.log(this.storage[key])
			return this.storage[key];
		} else {
			//console.log(undefined);
			return undefined;
		}
	}
	
	deleteValue(key) {
		delete this.storage[key];
	}

	getKeys() {
		//console.log(Object.keys(this.storage));
		return Object.keys(this.storage);
	}
}


var drinks = {
	'Mojito': {
		isAlcohol: 'no',
		recipe: [ 'soda', 'mint' ,'lime']
	},
	'Margarita': {
		isAlcohol: 'yes',
		recipe: [ 'tequila', 'cointreau' ,'lime juice', 'ice frappe']
	},
	'Blue hawaii': {
		isAlcohol: 'yes',
		recipe: [ 'rum', 'pineapple juice', 'coconut puree', 'Blue Curacao liquor']
	}
}