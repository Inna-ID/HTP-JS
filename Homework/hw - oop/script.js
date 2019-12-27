'use strict'

const PI = 3.14;

class Shape {
	constructor() {
		this.volume = 0;
	}

	getVolume() {
		return 0;
	}
}

class Box extends Shape {
	constructor(side) {
		super();
		this.side = side;	
		this.figures = [];
	}

	getVolume() {
		if(!this.volume) {
			this.volume = Math.pow(this.side, 3);
		}
		return this.volume;
	}

	calculateOccupiedCapacity() {
		let occupiedCapacity = 0;
		this.figures.forEach(function(item, i, arr) {
			occupiedCapacity += item.getVolume();
		});
		return occupiedCapacity;
	}

	add(shape) {
		console.log(`figure volume is ${shape.getVolume().toFixed(1)} - ${this.figures.length}`)
		var occupied = this.calculateOccupiedCapacity();
		// is enough space in box

		if(this.getVolume() > occupied + shape.getVolume()) {
			this.figures.push(shape);
			return true;
		} else {
			return false;
		}
	}
}

class Ball extends Shape {
	constructor(r) {
		super();
		this.r = r;
	}

	getVolume() {
		if(!this.volume) {
			this.volume = (3/4) * PI * Math.pow(this.r, 3);
		}
		return this.volume;
	}
}

class Pyramid extends Shape {
	constructor(h,s) {
		super();
		this.h = h;
		this.s = s;
	}

	getVolume() {
		if(!this.volume) {
			this.volume = (this.s * this.h) / 3;
		}
		return this.volume;
	}
}

class Cylinder extends Shape {
	constructor(h,r) {
		super();
		this.h = h;
		this.r = r;
	}

	getVolume() {
		if(!this.volume) {
			this.volume = PI * Math.pow(this.r, 2) * this.h;
		}
		return this.volume;
	}
}


function getRandomValue() {
	//from 2 to 10
	return Math.floor(Math.random() * 9 + 2);
}

var box = new Box(10);

var ball1 = new Ball(getRandomValue());
var cylinder1 = new Cylinder(getRandomValue(), getRandomValue());
var pyramid1 = new Pyramid(getRandomValue(), getRandomValue());
var box1 = new Box(getRandomValue());

box.add(ball1);
box.add(cylinder1);
box.add(pyramid1);
box.add(box1);

console.log(`${box.figures.length} figures added. It takes ${ box.calculateOccupiedCapacity().toFixed(1) } place from ${box.getVolume()}. It is ${(box.calculateOccupiedCapacity() / box.getVolume() * 100).toFixed(1)}% filled out in the cube`);