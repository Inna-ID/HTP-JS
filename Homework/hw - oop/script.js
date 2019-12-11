'use strict'

class Shape {
	constructor() {
		this.volume = 0;
	}

	getVolume() {
		return this.volume;
	}
}

class Box extends Shape {
	constructor(){
		super();
	}

	add(shape) {
		// is enough space in box getVolume()
	}
}

class Ball extends Shape {
	constructor(r) {
		this.r = r;
		super();
	}

	let PI = 3.14;

	getVolume(r) {
		//formula
		//volum = (3/4) * PI * Math.pow(r, 3);
	}

}


function getRandomValue() {
	return Math.floor(Math.random() * (14 - 2) + 2);
}

var ball1 = new Ball(getRandomValue());





