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
			return this.storage[key];
		} else {
			return undefined;
		}
	}
	
	deleteValue(key) {
		delete this.storage[key];
	}

	getKeys() {
		return Object.keys(this.storage);
	}
}