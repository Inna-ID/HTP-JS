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
			console.log(this.storage[key])
		} else {
			console.log(undefined);
		}
	}
	
	deleteValue(key) {
		delete this.storage[key];
	}

	getKeys() {
		console.log(Object.keys(this.storage));
	}
}

var drinkStorage = new HashStorage();

drinkStorage.addValue('drinkName', 'Kuba libre');
drinkStorage.getValue('drinkName');